import * as COMMON from './common'
import * as WEAPONS from './weapons'

export function countOfType(equipments, type) {
    return equipments.filter(i => COMMON.validateType(i.type, type)).length
}

export function countOfTypes(equipments, types) {
    return types.reduce((type, count) => count + countOfType(equipments, type))
}

export function filterType(equipments, type) {
    return equipments.filter(i => COMMON.validateType(i.type, type))
}

export function filterTypes(equipments, types) {
    return equipments.filter(i =>
        types.some(type => COMMON.validateType(i.type, type))
    )
}

export function removeSuperflux(equipments = [], equipsOfType, maxCount) {
    if (equipsOfType.length > maxCount) {
        const toRemove = equipsOfType.slice(
            equipsOfType.length - maxCount,
            equipsOfType.length - 1
        )
        // console.log({ toRemove })
        return equipments.filter(equip =>
            toRemove.every(toRm => toRm._id !== equip._id)
        )
    }
    return equipments
}

export async function removeSuperfluxElements(equipments = []) {
    if (equipments.length > 0) {
        let toReturn = equipments

        toReturn = removeSuperflux(toReturn, filterType(equipments, 'HAT'), 1)
        toReturn = removeSuperflux(
            toReturn,
            filterType(equipments, 'AMULET'),
            1
        )
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'RING'), 2)
        toReturn = removeSuperflux(
            toReturn,
            filterType(equipments, 'SHIELD'),
            1
        )
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'BELT'), 1)
        toReturn = removeSuperflux(toReturn, filterType(equipments, 'BOOTS'), 1)
        toReturn = removeSuperflux(
            toReturn,
            filterTypes(equipments, ['DOFUS', 'TROPHY']),
            6
        )
        toReturn = removeSuperflux(
            toReturn,
            filterTypes(equipments, ['CLOAK', 'BACKPACK']),
            1
        )
        toReturn = removeSuperflux(
            toReturn,
            filterTypes(equipments, ['PET', 'PETSMOUNT', 'MOUNT']),
            1
        )
        toReturn = removeSuperflux(
            toReturn,
            filterTypes(equipments, WEAPONS.ENUM),
            1
        )

        return toReturn
    }
}

export async function verifyBothAreSameCategory(firstEquip, secondEquip) {
    if (!firstEquip || !secondEquip) return null
    return firstEquip.category === secondEquip.category
}

export async function validateEquipments(equipments = []) {
    if (equipments.length > 16)
        throw new Error('You cannot equip more than 16 items')
    // if (equipments.length > 0) {
    //   console.log('i am here', equipments);
    //   console.log('i am here2 test=', Equipments.find({}).exec());
    //   const populatedEquipments = await Equipments.find({ _id: { $in: equipments }}).exec();
    //   console.log('i am here3', populatedEquipments);
    //   const differenceLength = equipments.length - populatedEquipments.length;
    //   if (differenceLength > 1) throw new Error(`${differenceLength} ids were not found in database.`);
    //   console.log('i am here4', differenceLength);
    //
    //   if (countOfType(populatedEquipments, 'HAT') > 1) throw new Error('Error: Max 1 hat in equipment');
    //   if (countOfType(populatedEquipments, 'AMULET') > 1) throw new Error('Error: Max 1 amulet in equipment');
    //   if (countOfType(populatedEquipments, 'RING') > 2) throw new Error('Error: Max 2 rings in equipment');
    //   if (countOfType(populatedEquipments, 'SHIELD') > 1) throw new Error('Error: Max 1 shield in equipment');
    //   if (countOfType(populatedEquipments, 'RING') > 2) throw new Error('Error: Max 2 rings in equipment');
    //   if (countOfType(populatedEquipments, 'BELT') > 1) throw new Error('Error: Max 1 belt in equipment');
    //   if (countOfType(populatedEquipments, 'BOOTS') > 1) throw new Error('Error: Max 1 pair of boots in equipment');
    //   if (countOfType(populatedEquipments, 'PET') > 1) throw new Error('Error: Max 1 pet in equipment');
    //   if (countOfType(populatedEquipments, 'PETSMOUNT') > 1) throw new Error('Error: Max 1 petsmount in equipment');
    //   if (countOfType(populatedEquipments, 'MOUNT') > 1) throw new Error('Error: Max 1 mount in equipment');
    //   if (countOfTypes(populatedEquipments, ['DOFUS', 'TROPHY']) > 6) throw new Error('Error: Max 6 dofus or trophies in equipment');
    //   if (countOfTypes(populatedEquipments, ['CLOAK', 'BACKPACK']) > 1) throw new Error('Error: Max 1 cloak or backpack in equipment');
    //   if (countOfTypes(populatedEquipments, WEAPONS.ENUM) > 1) throw new Error('Error: Max 1 weapon in equipment');
    // }
    // console.log('i am here5');
}
