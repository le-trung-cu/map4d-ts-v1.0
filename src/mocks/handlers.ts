// src/mocks/handlers.js
import { rest } from 'msw'

const dataLayers: Record<string, {
  id: string,
  name: string,
  type: string,
  geometryProperties: any[],
}> = {
  '1': {
    id: '1',
    name: 'layer 1',
    type: 'Polygon',
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
  '2': [
    {
      'id': 'p1',
      'name': 'name p1',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.955578870473,
              8.767018711027418
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p2',
      'name': 'name p2',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.96220580068382,
              9.14988898228016
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p3',
      'name': 'name p3',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.99034445001809,
              8.978110830447022
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p4',
      'name': 'name p4',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.02932956882995,
              8.660642603587775
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p5',
      'name': 'name p5',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.84247664282498,
              8.644183964528352
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p6',
      'name': 'name p6',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.87013897084091,
              8.917061972558983
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p7',
      'name': 'name p7',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.95966767161826,
              8.89546709048814
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p8',
      'name': 'name p8',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.13176452962131,
              8.85628227736494
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p9',
      'name': 'name p9',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.00348787569726,
              8.873440514317608
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p10',
      'name': 'name p10',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.00562543661118,
              8.74626886471566
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p11',
      'name': 'name p11',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.84592943366505,
              8.820797124176167
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p12',
      'name': 'name p12',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.86108580606293,
              8.722528039698759
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p13',
      'name': 'name p13',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.88648194098118,
              8.750836633501748
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p14',
      'name': 'name p14',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.90522721649006,
              8.719271581869393
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p15',
      'name': 'name p15',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.8544555178363,
              8.707930337610847
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p16',
      'name': 'name p16',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.83507971223054,
              8.726898342835938
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p17',
      'name': 'name p17',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.88858448061791,
              8.71875125714132
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p18',
      'name': 'name p18',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.86482019530172,
              8.740693381627821
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p19',
      'name': 'name p19',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.8831982771257,
              8.728021842083578
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p20',
      'name': 'name p20',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85832033046091,
              8.71484829299736
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p21',
      'name': 'name p21',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85854183616976,
              8.718804264236823
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p22',
      'name': 'name p22',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85459877212344,
              8.718678105113085
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p23',
      'name': 'name p23',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85691508857377,
              8.720919245874072
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p24',
      'name': 'name p24',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85651599587442,
              8.718179926791919
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p25',
      'name': 'name p25',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.8559300862459,
              8.719283113329567
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p26',
      'name': 'name p26',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85661324216807,
              8.716443512614276
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p27',
      'name': 'name p27',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85802939607271,
              8.717221291129121
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p28',
      'name': 'name p28',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85521746418897,
              8.717447886410639
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p29',
      'name': 'name p29',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85357504233048,
              8.717471752396861
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p30',
      'name': 'name p30',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.90272951681771,
              8.630897684677961
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p31',
      'name': 'name p31',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.89973589006615,
              8.666134793750857
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p32',
      'name': 'name p32',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.87680869121704,
              8.640850585851638
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p33',
      'name': 'name p33',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.86377545312331,
              8.674112397450372
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p34',
      'name': 'name p34',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.94788377608313,
              8.670415043216991
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p35',
      'name': 'name p35',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.94381880701826,
              8.629296803432851
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p36',
      'name': 'name p36',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.9216150593013,
              8.656385326090287
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p37',
      'name': 'name p37',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.88648293056673,
              8.64807686405156
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p38',
      'name': 'name p38',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.90642351484098,
              8.65181280126913
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p39',
      'name': 'name p39',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.20165812431827,
              9.209560661066547
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p40',
      'name': 'name p40',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.99339502399641,
              9.61001643434318
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p41',
      'name': 'name p41',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.96128256566891,
              9.805245312826372
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p42',
      'name': 'name p42',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.10372180836652,
              10.056169647277486
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p43',
      'name': 'name p43',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.85028076322942,
              10.205280147788685
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p44',
      'name': 'name p44',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.03713261405602,
              11.493084385171855
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p45',
      'name': 'name p45',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.94237561507538,
              11.964413218557482
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p46',
      'name': 'name p46',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.69503586391664,
              12.32126842356324
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p47',
      'name': 'name p47',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.66562203537461,
              13.047785121904269
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p48',
      'name': 'name p48',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.70402983716434,
              13.621527052817854
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p49',
      'name': 'name p49',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.52828818527695,
              14.280515325565759
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p50',
      'name': 'name p50',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.66137881765565,
              14.589555059662686
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p51',
      'name': 'name p51',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.71966998616398,
              15.024858900357245
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p52',
      'name': 'name p52',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.69681823670777,
              15.526482429862128
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p53',
      'name': 'name p53',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.43120905629382,
              15.79440672354545
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p54',
      'name': 'name p54',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.38966089461434,
              16.174634813524264
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p55',
      'name': 'name p55',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.07677637721258,
              16.449470975082335
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p56',
      'name': 'name p56',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.68495606321085,
              16.7367936649415
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p57',
      'name': 'name p57',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.49455490121915,
              17.149866706564282
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p58',
      'name': 'name p58',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.26862061473594,
              17.368346528531788
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p59',
      'name': 'name p59',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.9790604035195,
              17.688616979064733
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p60',
      'name': 'name p60',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.74592667507903,
              18.03402702391533
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p61',
      'name': 'name p61',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.4353171130744,
              18.336363685859
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p62',
      'name': 'name p62',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.27028291488301,
              18.5640539086086
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p63',
      'name': 'name p63',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.08906495071244,
              18.83369540436081
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p64',
      'name': 'name p64',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.72592529056425,
              18.978077946743255
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p65',
      'name': 'name p65',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.32114022108266,
              19.258180588736707
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p66',
      'name': 'name p66',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.35638432402266,
              19.564510466564016
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p67',
      'name': 'name p67',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.8355084389778,
              19.694381982154127
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p68',
      'name': 'name p68',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.02178970362348,
              20.01596915437281
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p69',
      'name': 'name p69',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.87379338902588,
              20.28193070235693
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p70',
      'name': 'name p70',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.74507732507419,
              20.60588146461258
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p71',
      'name': 'name p71',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.43250482427027,
              21.020137994030108
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p72',
      'name': 'name p72',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              103.43965609815007,
              21.35278951287765
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p73',
      'name': 'name p73',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              103.0978317978084,
              22.203659095243935
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p74',
      'name': 'name p74',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.55996917848205,
              22.236025144614842
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p75',
      'name': 'name p75',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.248408068716,
              21.920061740973722
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p76',
      'name': 'name p76',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.60449026711655,
              21.850511493501855
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p77',
      'name': 'name p77',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.27717819553203,
              22.215979288408462
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p78',
      'name': 'name p78',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.07498012187966,
              21.436916046394742
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p79',
      'name': 'name p79',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.0941682429704,
              22.040963741568802
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p80',
      'name': 'name p80',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.1331991194765,
              21.514637335669875
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p81',
      'name': 'name p81',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.97661024359235,
              21.97964617056205
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p82',
      'name': 'name p82',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.68982910270842,
              21.794439643320672
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p83',
      'name': 'name p83',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.92821533288867,
              21.75703958311385
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p84',
      'name': 'name p84',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.91121369790352,
              21.82055808074591
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p85',
      'name': 'name p85',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.92169195573115,
              21.803879448124107
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p86',
      'name': 'name p86',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.92921456131711,
              21.819784538362356
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p87',
      'name': 'name p87',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.90387867961778,
              21.793120249595233
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p88',
      'name': 'name p88',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.87784789672276,
              21.80409977166501
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p89',
      'name': 'name p89',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.9464676390885,
              21.783622280932775
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p90',
      'name': 'name p90',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94162292987289,
              21.809058977176846
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p91',
      'name': 'name p91',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93570677324715,
              21.798103410331322
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p92',
      'name': 'name p92',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93067817978482,
              21.803825321728368
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p93',
      'name': 'name p93',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.92871088581165,
              21.79898444233031
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p94',
      'name': 'name p94',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.9171018694301,
              21.799125465029988
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p95',
      'name': 'name p95',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93258764371643,
              21.800878271038087
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p96',
      'name': 'name p96',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.9358971121751,
              21.801507384849955
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p97',
      'name': 'name p97',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93229761886306,
              21.798601183490888
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p98',
      'name': 'name p98',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.92751903630415,
              21.80189839453736
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p99',
      'name': 'name p99',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.95495609393089,
              21.808889446336323
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p100',
      'name': 'name p100',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93671944612845,
              21.798419829488026
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p101',
      'name': 'name p101',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94077755215324,
              21.80230805696273
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p102',
      'name': 'name p102',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94844518060114,
              21.807352945337854
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p103',
      'name': 'name p103',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94840102821172,
              21.81038030376277
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p104',
      'name': 'name p104',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94566438084814,
              21.805758037665356
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p105',
      'name': 'name p105',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93454808648039,
              21.80578121297799
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p106',
      'name': 'name p106',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94340094473489,
              21.813160723306126
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p107',
      'name': 'name p107',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.95614756528266,
              21.813808410436593
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p108',
      'name': 'name p108',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.950053582402,
              21.813757060166623
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p109',
      'name': 'name p109',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.93285359136871,
              21.811222879113416
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p110',
      'name': 'name p110',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.95423282086387,
              21.802986188499844
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p111',
      'name': 'name p111',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.9425486184395,
              21.800392847854326
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p112',
      'name': 'name p112',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94991950309827,
              21.80548604673716
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p113',
      'name': 'name p113',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.95116455973397,
              21.79837900772435
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p114',
      'name': 'name p114',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94640617027386,
              21.795004332992434
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p115',
      'name': 'name p115',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.14095913569662,
              20.802632835362843
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p116',
      'name': 'name p116',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.43872240167121,
              19.403628429814788
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p117',
      'name': 'name p117',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.01128427544819,
              16.924504068746927
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p118',
      'name': 'name p118',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.48745563171798,
              17.51276532796254
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p119',
      'name': 'name p119',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.94155115907273,
              17.819061432603363
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p120',
      'name': 'name p120',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.28553570416346,
              17.939323347052223
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p121',
      'name': 'name p121',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.88752045275777,
              18.205883053511073
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p122',
      'name': 'name p122',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.49479180830775,
              18.69535464402935
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p123',
      'name': 'name p123',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.36552620812603,
              19.012477476913347
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p124',
      'name': 'name p124',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.20690291952343,
              19.341805714116177
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p125',
      'name': 'name p125',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.71851600168549,
              19.41373608459631
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p126',
      'name': 'name p126',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              104.98414970133211,
              19.49062376424206
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p127',
      'name': 'name p127',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.05638311283843,
              19.179637220220073
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p128',
      'name': 'name p128',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.49118033686295,
              19.692724472201718
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p129',
      'name': 'name p129',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.6640379757713,
              19.514261795161346
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p130',
      'name': 'name p130',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.58833515164503,
              19.204465703712913
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p131',
      'name': 'name p131',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.27313740021003,
              19.835914082023393
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p132',
      'name': 'name p132',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.24908775277555,
              19.662244434350114
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p133',
      'name': 'name p133',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.6730766098882,
              14.335464804525358
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p134',
      'name': 'name p134',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.3258903404722,
              15.339757802209263
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p135',
      'name': 'name p135',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.81008698968884,
              14.090658752640138
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p136',
      'name': 'name p136',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.79949272788605,
              13.687636255509858
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p137',
      'name': 'name p137',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.29912403679486,
              13.513266661849357
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p138',
      'name': 'name p138',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.08196954472089,
              13.956786557342127
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p139',
      'name': 'name p139',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.44688623537536,
              14.94531515452016
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p140',
      'name': 'name p140',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.72482921377156,
              12.534617996111606
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p141',
      'name': 'name p141',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.52038569637983,
              12.186475040389482
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p142',
      'name': 'name p142',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.58226342929748,
              11.608903191711804
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p143',
      'name': 'name p143',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.9396170949621,
              11.549874130243836
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p144',
      'name': 'name p144',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.26621370844236,
              10.900504776626548
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p145',
      'name': 'name p145',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.47919355967463,
              11.842281495427102
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p146',
      'name': 'name p146',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.37809841583561,
              12.547758608454814
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p147',
      'name': 'name p147',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.96201909808178,
              12.994397990736815
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p148',
      'name': 'name p148',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.025091230334,
              11.404660096845177
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p149',
      'name': 'name p149',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.82020671434321,
              13.215289264421813
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p150',
      'name': 'name p150',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.19202386375252,
              10.550384381686968
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p151',
      'name': 'name p151',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.67654408278497,
              10.645822368267815
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p152',
      'name': 'name p152',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              105.97430633670587,
              9.883554863511279
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p153',
      'name': 'name p153',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.93988316282878,
              11.113383256247602
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p154',
      'name': 'name p154',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.76933396785557,
              12.034802608386386
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p155',
      'name': 'name p155',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              106.71496369067717,
              11.151572594894859
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p156',
      'name': 'name p156',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.45716379699309,
              13.148142488828583
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p157',
      'name': 'name p157',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              108.18732881668961,
              14.801747689796898
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p158',
      'name': 'name p158',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.94259090923441,
              15.717347589093379
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p159',
      'name': 'name p159',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.89257326476627,
              16.251030856477726
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p160',
      'name': 'name p160',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.19804665336892,
              16.704367065827924
            ],
            'type': 'Point'
          }
        }
      ]
    },
    {
      'id': 'p161',
      'name': 'name p161',
      'dataLayerId': '2',
      'geometryPropertyId': '1',
      'timelines': [
        {
          'startDate': null,
          'endDate': null,
          'geometry': {
            'coordinates': [
              107.59012329345853,
              16.120484653210355
            ],
            'type': 'Point'
          }
        }
      ]
    }
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
      const { id, name, type } = dataLayers[dataLayerId]
      result.push({ id, name, type })
    }
    return res(ctx.json(result))
  }),

  rest.get('/api/data-layers/:id/main-objects/count', (req, res, ctx) => {
    const id = req.params.id as string
    return res(ctx.json({
      count: mainObjects[id].length
    }))
  }),

  rest.get('/api/data-layers/:id/main-objects', async (req, res, ctx) => {
    await new Promise((res, rej) => setTimeout(res, Math.random() * 1500))
    const id = req.params.id as string
    const pageSize = parseInt(req.url.searchParams.get('page-size') || '3')
    const page = parseInt(req.url.searchParams.get('page') || '1')
    const mainObjectsOfPage = mainObjects[id].slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    return res(ctx.json({
      layerId: id,
      type: dataLayers[id].type,
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