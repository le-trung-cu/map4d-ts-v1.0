// src/mocks/handlers.js
import { DrawTypes } from '@/core/types'
import { rest } from 'msw'
import points from './data/points.json'

const dataLayers: Record<string, {
  id: string,
  name: string,
  type: string,
  drawType: DrawTypes,
  geometryProperties: any[],
}> = {
  '1': {
    id: '1',
    name: 'layer 1',
    type: 'Polygon',
    drawType: 'DataLayer',
    geometryProperties: [
      {
        id: '1',
        dataLayerId: '1',
        name: 'style 1',
        strockeColor: 'red',
        icon: '',
        object3d: '',
      }
    ]
  },
  '2': {
    id: '2',
    name: 'layer 2',
    type: 'Point',
    drawType: 'MarkerCluster',
    geometryProperties: [
      {
        id: '1',
        dataLayerId: '2',
        name: 'style 1',
        strockeColor: 'red',
        icon: '',
        object3d: '',
      }
    ]
  },
  '3': {
    id: '3',
    name: 'layer 3',
    type: 'Polygon',
    drawType: 'DataLayer',
    geometryProperties: [
      {
        id: '1',
        dataLayerId: '1',
        name: 'style 1',
        strockeColor: 'red',
        icon: '',
        object3d: '',
      }
    ]
  }
}

const mainObjects: Record<string, any[]> = {
  '1': [
    {
      id: '1',
      name: 'name 1',
      dataLayerId: '1',
      timelines: [
        {
          // current
          startDate: null,
          endDate: null,
          geometryPropertyId: '1',
          geometry: {
            locations: [[1, 1]],
            'type': 'Polygon',
            coordinates: [
              [
                [
                  108.2240608674158,
                  16.071563206196288
                ],
                [
                  108.2240608674158,
                  16.070278227933272
                ],
                [
                  108.22502754535594,
                  16.070278227933272
                ],
                [
                  108.22502754535594,
                  16.071563206196288
                ],
                [
                  108.2240608674158,
                  16.071563206196288
                ]
              ]
            ],
          },
        },
      ],
    },
    {
      id: '2',
      name: 'name 2',
      dataLayerId: '1',
      locations: [[1, 1]],
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  108.22278807479455,
                  16.07148579810236
                ],
                [
                  108.22278807479455,
                  16.07041756332697
                ],
                [
                  108.2238353092294,
                  16.07041756332697
                ],
                [
                  108.2238353092294,
                  16.07148579810236
                ],
                [
                  108.22278807479455,
                  16.07148579810236
                ]
              ]
            ],
          }
        }
      ],
    },
    {
      id: '3',
      name: 'name 3',
      dataLayerId: '1',
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          geometry: {
            coordinates: [
              [
                [
                  108.22130583528599,
                  16.071238091998595
                ],
                [
                  108.22130583528599,
                  16.07046400843656
                ],
                [
                  108.22254640530883,
                  16.07046400843656
                ],
                [
                  108.22254640530883,
                  16.071238091998595
                ],
                [
                  108.22130583528599,
                  16.071238091998595
                ]
              ]
            ],
            'type': 'Polygon'
          }
        }
      ],
    },
    {
      id: '4',
      name: 'name 4',
      dataLayerId: '1',
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          geometry: {
            coordinates: [
              [
                [
                  108.2205486042331,
                  16.071222610356642
                ],
                [
                  108.2205486042331,
                  16.07063430707852
                ],
                [
                  108.22106416580164,
                  16.07063430707852
                ],
                [
                  108.22106416580164,
                  16.071222610356642
                ],
                [
                  108.2205486042331,
                  16.071222610356642
                ]
              ]
            ],
            'type': 'Polygon'
          }
        }
      ]
    },
    {
      id: '5',
      name: 'name 5',
      dataLayerId: '1',
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          geometry: {
            coordinates: [
              [
                [
                  108.22059693813083,
                  16.070448526734324
                ],
                [
                  108.22059693813083,
                  16.069442213521256
                ],
                [
                  108.22098360930681,
                  16.069442213521256
                ],
                [
                  108.22098360930681,
                  16.070448526734324
                ],
                [
                  108.22059693813083,
                  16.070448526734324
                ]
              ]
            ],
            'type': 'Polygon'
          }
        }
      ]
    },
    {
      id: '6',
      name: 'name 6',
      dataLayerId: '1',
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          geometry: {
            coordinates: [
              [
                [
                  108.22133805788434,
                  16.070293709648723
                ],
                [
                  108.22133805788434,
                  16.069813775916003
                ],
                [
                  108.22183750815367,
                  16.069813775916003
                ],
                [
                  108.22183750815367,
                  16.070293709648723
                ],
                [
                  108.22133805788434,
                  16.070293709648723
                ]
              ]
            ],
            'type': 'Polygon'
          }
        }
      ]
    },
    {
      id: '7',
      name: 'name 7',
      dataLayerId: '1',
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          'geometry': {
            'coordinates': [
              [
                [
                  108.2219663985461,
                  16.07034015478719
                ],
                [
                  108.2219663985461,
                  16.0696434765714
                ],
                [
                  108.22272362959893,
                  16.0696434765714
                ],
                [
                  108.22272362959893,
                  16.07034015478719
                ],
                [
                  108.2219663985461,
                  16.07034015478719
                ]
              ]
            ],
            'type': 'Polygon'
          }
        }
      ]
    },
    {
      id: '8',
      name: 'name 8',
      dataLayerId: '1',
      geometryPropertyId: '1',
      timelines: [
        {
          startDate: null,
          endDate: null,
          'geometry': {
            'coordinates': [
              [
                [
                  [
                    108.2235508056753,
                    16.071965848209146
                  ],
                  [
                    108.2235508056753,
                    16.071271650816655
                  ],
                  [
                    108.22515621158561,
                    16.071271650816655
                  ],
                  [
                    108.22515621158561,
                    16.071965848209146
                  ],
                  [
                    108.2235508056753,
                    16.071965848209146
                  ]
                ]
              ],
              [
                [
                  [
                    108.2221518090974,
                    16.071938300740015
                  ],
                  [
                    108.2221518090974,
                    16.071150441499242
                  ],
                  [
                    108.2232297244941,
                    16.071150441499242
                  ],
                  [
                    108.2232297244941,
                    16.071938300740015
                  ],
                  [
                    108.2221518090974,
                    16.071938300740015
                  ]
                ]
              ]
            ],
            'type': 'MultiPolygon'
          }
        }
      ]
    },
  ],
  '3': [
    {
      id: '200',
      name: 'name 200',
      dataLayerId: '3',
      timelines: [
        {
          // current
          startDate: null,
          endDate: null,
          geometryPropertyId: '1',
          geometry: {
            locations: [[1, 1]],
            'type': 'Polygon',
            coordinates: [
              [
                [
                  108.22510723597429,
                  16.072472987833663
                ],
                [
                  108.22510723597429,
                  16.072100344265408
                ],
                [
                  108.2259674502065,
                  16.072100344265408
                ],
                [
                  108.2259674502065,
                  16.072472987833663
                ],
                [
                  108.22510723597429,
                  16.072472987833663
                ]
              ]
            ],
          },
        },
      ],
    },
  ],
}

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', null),

  // Handles a GET /user request
  rest.get('/user', null),

  rest.get('/api/data-layers', (req, res, ctx) => {
    const result = []
    for (const dataLayerId in dataLayers) {
      const { id, name, type, drawType } = dataLayers[dataLayerId]
      result.push({ id, name, type, drawType })
    }
    return res(ctx.json(result))
  }),

  rest.get('/api/data-layers/:id/main-objects/count', (req, res, ctx) => {
    const id = req.params.id as string
    return res(ctx.json({
      count: id === '2' ? 100 : mainObjects[id].length
    }))
  }),

  rest.get('/api/data-layers/:id/main-objects', async (req, res, ctx) => {
    // await new Promise((res, rej) => setTimeout(res, Math.random() * 1500))
    const id = req.params.id as string
    const pageSize = parseInt(req.url.searchParams.get('page-size') || '3')
    const page = parseInt(req.url.searchParams.get('page') || '1')
    let mainObjectsOfPage

    if (id !== '2') {
      mainObjectsOfPage = mainObjects[id].slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    } else {
      const result = await import(`@/mocks/data/points/points_${page}.json`)
      mainObjectsOfPage = result.default
    }
    return res(ctx.json({
      layerId: id,
      type: dataLayers[id].type,
      drawType: dataLayers[id].drawType,
      page: page,
      mainObjects: mainObjectsOfPage,
    }))
  }),

  rest.get('/api/data-layers/:id/geometry-properties', async (req, res, ctx) => {
    const id = req.params.id as string
    return res(ctx.json(
      dataLayers[id]
    ))
  }),
]

//   / api / data - layers / 2 / tile / 7 / 103 / 59.png
// var d_lng = 106.59001156478854 - 104.04886629091425
// var d_lat = 22.20219088189235 - 21.11496654076096
// const nums = [30000]
// for (let a = 0; a < 10; a++) {
//   var ps = [[], [], [], [], []]
//   for (let i = a*1000; i < 20000; i++) {
//     const ran_lng = 104.04886629091425 + (Math.random() * d_lng)
//     const ran_lat = 21.11496654076096 + (Math.random() * d_lat)

//     ps.push({
//       'id': `p${i}`,
//       'name': `name p${i}`,
//       'dataLayerId': '2',
//       'geometryPropertyId': '1',
//       'timelines': [
//         {
//           'startDate': null,
//           'endDate': null,
//           'geometry': {
//             'coordinates': [
//               ran_lng,
//               ran_lat
//             ],
//             'type': 'Point'
//           }
//         }
//       ]
//     },)
//   }

// }


