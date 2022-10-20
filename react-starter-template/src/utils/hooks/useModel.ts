/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { useContext } from "react";
import { ModelContext } from "../context/context";

// Used by FluidContext, useDispatch and useSelector
export const useModel = () => useContext(ModelContext);
