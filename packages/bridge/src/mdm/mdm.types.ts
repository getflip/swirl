import { BridgeRequest } from "../messaging/messaging.types";
import { BridgeMethod } from "../types";

export type IsMdmManagedRequest = BridgeRequest<BridgeMethod.IS_MDM_MANAGED>;

export type IsMdmManagedResult = boolean;
