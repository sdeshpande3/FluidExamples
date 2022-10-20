/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedMap } from "fluid-framework";
import { TinyliciousMember } from "@fluidframework/tinylicious-client";

export interface Node {
    value: number;
}

export interface AudienceMember extends TinyliciousMember {}

export interface InitialObjects {
    myMap: ISharedMap;
}
