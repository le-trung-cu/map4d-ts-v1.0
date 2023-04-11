// src/mocks/handlers.js
import { rest } from 'msw'

const dataLayers: Record<string, any> = {
  '1': {
    id: '1',
    name: 'layer 1',
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
      geometryPropertiesId: '1',
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'locations': [[1, 1]],
        'coordinates': [
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
        'type': 'Polygon'
      }
    },
    {
      id: '2',
      name: 'name 2',
      dataLayerId: '1',
      geometryPropertiesId: '1',
      locations: [[1, 1]],
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'coordinates': [
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
        'type': 'Polygon'
      }
    },
    {
      id: '3',
      name: 'name 3',
      dataLayerId: '1',
      geometryPropertiesId: '1',
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'coordinates': [
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
    },
    {
      id: '4',
      name: 'name 4',
      dataLayerId: '1',
      geometryPropertiesId: '1',
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'coordinates': [
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
    },
    {
      id: '5',
      name: 'name 5',
      dataLayerId: '1',
      geometryPropertiesId: '1',
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'coordinates': [
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
    },
    {
      id: '6',
      name: 'name 6',
      dataLayerId: '1',
      geometryPropertiesId: '1',
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'coordinates': [
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
    },
    {
      id: '7',
      name: 'name 7',
      dataLayerId: '1',
      geometryPropertiesId: '1',
      'type': 'Feature',
      'properties': {},
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
    },
    // {
    //   id: '8',
    //   name: 'name 8',
    //   geometryPropertiesId: '1',
    //   'type': 'Feature',
    //   'properties': {},
    //   'geometry': {
    //     'coordinates': [
    //       [
    //         [
    //           108.22293307648482,
    //           16.07023178278037
    //         ],
    //         [
    //           108.22293307648482,
    //           16.068745532160307
    //         ],
    //         [
    //           108.22377086403378,
    //           16.068745532160307
    //         ],
    //         [
    //           108.22377086403378,
    //           16.07023178278037
    //         ],
    //         [
    //           108.22293307648482,
    //           16.07023178278037
    //         ]
    //       ]
    //     ],
    //     'type': 'Polygon'
    //   }
    // },
    // {
    //   id: '9',
    //   name: 'name 9',
    //   geometryPropertiesId: '1',
    //   'type': 'Feature',
    //   'properties': {},
    //   'geometry': {
    //     'coordinates': [
    //       [
    //         [
    //           108.22422198040539,
    //           16.07018533761658
    //         ],
    //         [
    //           108.22422198040539,
    //           16.06982925766755
    //         ],
    //         [
    //           108.22501143405663,
    //           16.06982925766755
    //         ],
    //         [
    //           108.22501143405663,
    //           16.07018533761658
    //         ],
    //         [
    //           108.22422198040539,
    //           16.07018533761658
    //         ]
    //       ]
    //     ],
    //     'type': 'Polygon'
    //   }
    // },
    // {
    //   id: '10',
    //   name: 'name 10',
    //   geometryPropertiesId: '1',
    //   'type': 'Feature',
    //   'properties': {},
    //   'geometry': {
    //     'coordinates': [
    //       [
    //         [
    //           108.22407697871364,
    //           16.06968992186175
    //         ],
    //         [
    //           108.22407697871364,
    //           16.069318359235652
    //         ],
    //         [
    //           108.22489865496345,
    //           16.069318359235652
    //         ],
    //         [
    //           108.22489865496345,
    //           16.06968992186175
    //         ],
    //         [
    //           108.22407697871364,
    //           16.06968992186175
    //         ]
    //       ]
    //     ],
    //     'type': 'Polygon'
    //   }
    // },
    // {
    //   id: '11',
    //   name: 'name 11',
    //   geometryPropertiesId: '1',
    //   'type': 'Feature',
    //   'properties': {},
    //   'geometry': {
    //     'coordinates': [
    //       [
    //         [
    //           108.22409309001296,
    //           16.06920998667205
    //         ],
    //         [
    //           108.22409309001296,
    //           16.068730050325016
    //         ],
    //         [
    //           108.22496310015896,
    //           16.068730050325016
    //         ],
    //         [
    //           108.22496310015896,
    //           16.06920998667205
    //         ],
    //         [
    //           108.22409309001296,
    //           16.06920998667205
    //         ]
    //       ]
    //     ],
    //     'type': 'Polygon'
    //   }
    // },
  ]
}

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', null),

  // Handles a GET /user request
  rest.get('/user', null),

  rest.get('/api/data-layers/:id/main-objects/count', (req, res, ctx) => {
    const id = req.params.id as string
    return res(ctx.json({
      count: mainObjects[id].length
    }))
  }),

  rest.get('/api/data-layers/:id/main-objects', async (req, res, ctx) => {
    await new Promise((res, rej) => setTimeout(res, 1500))
    const id = req.params.id as string
    const page = parseInt(req.url.searchParams.get('page') as string)
    const mainObjectsOfPage = mainObjects[id].slice((page - 1) * 10, (page - 1) * 10 + 10)
    return res(ctx.json({
      layerId: id,
      page: page,
      mainObjects: mainObjectsOfPage,
    }))
  }),

  rest.get('/api/data-layers/:id/geometry-properties', async (req, res, ctx) => {
    const id = req.params.id as string
    return res(ctx.json(
      dataLayers[id]
    ))
  })
]