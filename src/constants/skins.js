import {
    BACKPACK,
    CLOAK,
    HAT,
    SHIELD,
    CEREMONIAL,
    LIVING_OBJECT,
} from './equipments';

import { MOUNT } from "./mounts";
import { PET, PETSMOUNT } from "./pets";


export const hatSkinTypes = [HAT, LIVING_OBJECT, CEREMONIAL];
export const cloakSkinTypes = [CLOAK, BACKPACK, LIVING_OBJECT, CEREMONIAL];
export const shieldSkinTypes = [SHIELD, LIVING_OBJECT, CEREMONIAL];
export const petSkinTypes = [MOUNT, PET, PETSMOUNT, LIVING_OBJECT, CEREMONIAL]; // LIVING_OBJECT pet is incoming, see Bulbijevan
