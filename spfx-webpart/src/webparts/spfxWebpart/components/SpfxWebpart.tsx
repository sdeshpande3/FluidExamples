import * as React from "react";
import styles from "./SpfxWebpart.module.scss";
import { ISpfxWebpartProps } from "./ISpfxWebpartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  FrsClient,
  InsecureTokenProvider,
} from "@fluid-experimental/frs-client";
import { SharedMap } from "@fluid-experimental/fluid-framework";

const getContainerId = () => {
  let isNew = false;
  if (window.location.hash.length === 0) {
    isNew = true;
    window.location.hash = Date.now().toString();
  }
  const containerId = window.location.hash.substring(1);
  return { containerId, isNew };
};

const localConfig = {
  tenantId: "local",
  tokenProvider: new InsecureTokenProvider("tenantKey", { id: "userId" }),
  orderer: "http://localhost:7070",
  storage: "http://localhost:7070",
};

const getFluidMap = async () => {
  const { containerId, isNew } = getContainerId();

  const containerSchema = {
    name: "cra-demo",
    initialObjects: { mySharedMap: SharedMap },
  };

  const client = new FrsClient(localConfig);
  const { fluidContainer } = isNew
    ? await client.createContainer({ id: containerId }, containerSchema)
    : await client.getContainer({ id: containerId }, containerSchema);
  // returned initialObjects are live Fluid data structures
  return fluidContainer.initialObjects.mySharedMap as SharedMap;
};

export default function SpfxWebpart(props: ISpfxWebpartProps) {
  const [fluidMap, setFluidMap] = React.useState<SharedMap | undefined>();
  const [viewData, setViewData] = React.useState({ time: "" });

  React.useEffect(() => {
    // Get/Create container and return live Fluid data
    getFluidMap().then((data) => setFluidMap(data));
  }, []);

  React.useEffect(() => {
    if (!fluidMap) return;

    // sync Fluid data into view state
    const syncView = () => setViewData({ time: fluidMap.get("time") });
    // ensure sync runs at least once
    syncView();
    // update state each time our map changes
    fluidMap.on("valueChanged", syncView);
    return () => {
      fluidMap.off("valueChanged", syncView);
    };
  }, [fluidMap]);

  if (!viewData) return <div />;

  // business logic could be passed into the view via context
  const setTime = () => fluidMap.set("time", Date.now().toString());

  return (
    <div>
      <button onClick={setTime}> click </button>
      <span>{viewData.time}</span>
    </div>
  );
}
