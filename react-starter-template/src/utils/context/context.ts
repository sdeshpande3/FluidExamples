/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { createContext } from "react";
import { FluidModel } from "../../model/model";

export const ModelContext = createContext<FluidModel>({} as FluidModel);
