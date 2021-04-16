export const FECA = 'Féca'
export const OSAMODAS = 'Osamodas'
export const ENUTROF = 'Enutrof'
export const SRAM = 'Sram'
export const XELOR = 'Xelor'
export const ECAFLIP = 'Ecaflip'
export const ENIRIPSA = 'Eniripsa'
export const IOP = 'Iop'
export const CRA = 'Cra'
export const SADIDA = 'Sadida'
export const SACRIEUR = 'Sacrieur'
export const PANDAWA = 'Pandawa'
export const ROUBLARD = 'Roublard'
export const ZOBAL = 'Zobal'
export const STEAMER = 'Steamer'
export const ELIOTROPE = 'Eliotrope'
export const HUPPERMAGE = 'Huppermage'
export const OUGINAK = 'Ouginak'

export const EAU = 'Eau'
export const TERRE = 'Terre'
export const FEU = 'Feu'
export const AIR = 'Air'
export const DO_CRIT = 'Do Crit'
export const DO_POU = 'Do pou'
export const PVP = 'PvP'
export const PVP_1V1 = '1v1'
export const PVP_3V3 = '3v3'
export const PVP_5V5 = '5v5'
export const PVM = 'PvM'

export const translations = {
    // Breeds
    FECA,
    OSAMODAS,
    ENUTROF,
    SRAM,
    XELOR,
    ECAFLIP,
    ENIRIPSA,
    IOP,
    CRA,
    SADIDA,
    SACRIEUR,
    PANDAWA,
    ROUBLARD,
    ZOBAL,
    STEAMER,
    ELIOTROPE,
    HUPPERMAGE,
    OUGINAK,

    // levels
    ...Object.fromEntries(
        Array(200)
            .fill('')
            .map((_, index) => [`LEVEL_${index}`, `LEVEL_${index}`])
    ),

    // element
    EAU,
    TERRE,
    FEU,
    AIR,
    DO_CRIT,
    DO_POU,

    // type of matches
    PVP,
    PVP_1V1,
    PVP_3V3,
    PVP_5V5,
    PVM,
}

export const ENUM = Object.keys(translations)
