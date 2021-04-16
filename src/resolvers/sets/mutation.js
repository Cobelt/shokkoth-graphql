import axios from 'axios'
import clone from 'lodash.clonedeep'
import set from 'lodash.set'
import { STATS } from '../../constants'

import { Sets, Equipments } from '../../models'

import { formatSet, replaceDeep } from '../../utils'
import { initStats } from '../stuffs'

import { dofusbookStatsMap } from '../import'

export async function importFromDofapi(rp) {
    try {
        const { data } = await axios.get('https://fr.dofus.dofapi.fr/sets')

        return Promise.all(
            data?.map(async setObj => {
                const formatted = formatSet(clone(setObj))
                const equipments = await Equipments.find(
                    {
                        setAnkamaId: formatted?.ankamaId,
                    },
                    { _id: true }
                )
                const equipmentsIds = equipments?.map(({ _id }) => _id)
                set(formatted, 'equipments', equipmentsIds)

                const setSaved = await Sets.findOneAndUpdate(
                    { ankamaId: formatted?.ankamaId },
                    formatted,
                    { new: true, upsert: true }
                )

                if (equipments?.length > 0) {
                    await Promise.all(
                        equipments.map(async equip => {
                            equip.setId = setSaved._id
                            equip.save()
                        })
                    )
                }

                return setSaved
            })
        )
    } catch (e) {
        console.error(e)
        return e
    }
}

export async function importSetsBonuses(rp) {
    try {
        const { startId = 0, endId = 100 } = rp?.args
        const sets = await Sets.find({
            ankamaId: { $gte: startId, $lte: endId },
        })

        return Promise.all(
            sets?.map(async set => {
                if (!set?.ankamaId) {
                    throw new Error(`Le set ${set?._id} n'a pas d'ankamaId`)
                }

                const { data } = await axios.get(
                    'https://www.dofusbook.net/api/cloths/' + set?.ankamaId,
                    {
                        headers: {
                            cookie:
                                '__cfduid=d59942f2a85767fe93330de6dad858a3e1618493891; __gads=ID=a14ff67d2866b1c5-225e73aa86a7000d:T=1618493892:RT=1618493892:S=ALNI_MZ6opa2zdHgdTpyp83jjOlwIuoOlw; _ga=GA1.2.1476440552.1618493893; _gid=GA1.2.1273739026.1618493893; cookieconsent_status=dismiss; _gat_gtag_UA_11860669_1=1',
                            referer:
                                'https://www.dofusbook.net/fr/encyclopedie/panoplie/' +
                                set?.ankamaId,
                        },
                    }
                )

                const { cloth_effect } = data || {}

                const bonuses = []

                if (cloth_effect) {
                    cloth_effect.forEach(stage => {
                        let nbItems = stage?.[0]?.count

                        const stats = initStats()
                        stage.forEach(dbStat => {
                            const { name, value } = dbStat
                            const mappedStat = dofusbookStatsMap?.[name]
                            if (!STATS.getKey(mappedStat)) {
                                console.log('Unknown stat', name, mappedStat)
                            } else {
                                stats[STATS.getKey(mappedStat)] = value
                            }
                        })

                        bonuses.push({
                            nbItems,
                            statistics: replaceDeep(
                                stats,
                                ['', null, 0],
                                undefined
                            ),
                        })
                    })
                }
                // console.log({ bonuses })
                set.bonus = bonuses
                return set.save()
            })
        )
    } catch (e) {
        console.error(e)
        return e
    }
}
