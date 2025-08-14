# 大鸭鸭API文档

大鸭鸭实时积分榜使用REST API。

## 列举所有比赛

### 接口

```GET /contests/```

### 功能描述

用于获取大鸭鸭实时积分榜记录的所有比赛

### Content-Type

```application/json```

### 返回

-   List\[\]:
-   \_id: string 大鸭鸭赛事ID
-   majsoulFriendlyId: int 雀魂6位数赛事ID
-   name: string 赛事名称
-   displayName: string （可选）大鸭鸭覆盖赛事名称

### 示例

响应数据包

```json
    [
    	{
    		"_id": "660a0d837aec1e611e64bb8a",
    		"majsoulFriendlyId": 750932,
    		"name": "第四届鸭鸭杯",
    		"displayName": "第④届鸭鸭杯 - 死者苏生"
    	},
        {
            "_id": "66c59871a09265ad1e0180d8",
            "majsoulFriendlyId": 827272,
            "name": "第四届碳基生物C League"
        }
    ]
```

## 获取比赛详情

### 接口

```GET /contests/{contestId}```

### 功能描述

用于获取{contestId}指定比赛的详细信息

### Content-Type

```application/json```

### 返回

-   \_id: string 大鸭鸭赛事ID
-   majsoulFriendlyId: int 雀魂6位数赛事ID
-   track: boolean 积分榜是否追踪赛事比赛更新
-   createdTime: int 赛事创建时间戳（毫秒）
-   finishTime: int 赛事结束时间戳（毫秒）
-   majsoulId: int 雀魂赛事后台API用5位/8位赛事ID
-   name: string 赛事名称
-   displayName: string （可选）大鸭鸭覆盖赛事名称
-   startTime: int 赛事开始时间戳（毫秒）
-   type: int 0代表个人赛，1代表团队赛
-   tourneyType: int 定义个人赛计分方式（0为累计点数上位，1为最高连续精算点）
-   teams: List\[[Team](#team)\] 队伍/阵营列表
-   initialPhaseName: string （可选）初始比赛阶段名称
-   anthem: string （可选）YouTube背景音乐视频代码 - 浏览器加载可能需要科学上网
-   maxGames: int （可选）积分榜最多统计比赛数量（未显示则不限）
-   tagline: string （可选）赛事右上角介绍
-   taglineAlternate: string （可选）赛事右上角介绍【彩蛋】
-   lastRefreshed: int 赛事最后刷新时间戳（毫秒）
-   refresh: boolean 是否需要刷新比赛 默认为false
-   splitTies: boolean （可选）打点相同是否平分马点 未出现则为false
-   showTeamTotals: boolean （可选）是否显示个人赛阵营总得分
-   showPlayerCountries: boolean （可选）是否显示选手服务器归属 未出现则为false
-   notFoundOnMajsoul: （可选）是否可在雀魂搜到赛事
-   transitions: List\[Transitions\] （可选）定义比赛Transition
-   phases: List\[[Phase](#)\] 定义比赛阶段

### 示例

响应数据包 - 个人赛

```json
    {
    	"_id": "660e1e9a7aec1e611e64bb8b",
    	"majsoulFriendlyId": 496972,
    	"createdTime": 1711189541000,
    	"finishTime": 1718899200000,
    	"majsoulId": 17753,
    	"name": "银狼模拟房",
    	"startTime": 1711189800000,
    	"track": false,
    	"anthem": "VGjhgbS1oIY",
    	"taglineAlternate": "Authorization: Basic Q3liZXJBbmdlbDpaZXJvRXhjZXB0aW9u",
    	"tagline": "Silverwolf Mahjong 4 Practice",
    	"notFoundOnMajsoul": true,
    	"showPlayerCountries": true,
    	"phases": [
    		{
    			"name": "予選",
    			"startTime": 0,
    			"index": 0
    		}
    	]
    }
```

响应数据包 - 团队赛

```json
    {
    	"_id": "66c59871a09265ad1e0180d8",
    	"majsoulFriendlyId": 827272,
    	"track": true,
    	"createdTime": 1723187259000,
    	"finishTime": 1730020934000,
    	"majsoulId": 52528921,
    	"name": "第四届碳基生物C League",
    	"startTime": 1727085600000,
    	"type": 1,
    	"teams": [...],
    	"initialPhaseName": "常规赛",
    	"anthem": "tdypWBQsErA",
    	"tagline": "Ciallo ～(∠・ω< )⌒★!",
    	"taglineAlternate": "红烧天堂 天下一番",
    	"lastRefreshed": 1730150838226,
    	"refresh": false,
    	"splitTies": true,
    	"transitions": [...],
    	"phases": [...]
    }
```

## 列举比赛数据统计

### 接口

```GET /contests/{contestId}/stats```

### 功能描述

用于获取{contestId}指定比赛的数据统计

### Content-Type

```application/json```

### 参数

必填一个参数，最多只能同时填写一个参数

-   team: string 获取{teamId}指定队伍/阵营的通算数据
-   player: string 获取{playerId}指定选手的通算数据
-   players: NoneType 获取所有选手数据

### 返回

-   {teamId}: application/json 队伍/阵营的通算数据
-   {playerId}: application/json 选手的通算数据

### 示例

响应数据包 - team=66c59c24a09265ad1e0180e2

```json
    {
    	"66c59c24a09265ad1e0180e2": {
    		"version": 3,
    		"stats": {
    			"gamesPlayed": 48,
    			"totalHands": 593,
    			"totalRank": 112,
    			"totalHaipaiShanten": 2169,
    			"uraDora": 23,
    			"akaDora": 73,
    			"riichi": {
    				"total": 102,
    				"uraHit": 19,
    				"first": 81,
    				"chase": 21,
    				"chased": 14,
    				"furiten": 4,
    				"ippatsu": 10
    			},
    			"dealer": {
    				"tsumoHit": 37,
    				"tsumoHitPoints": 110400,
    				"tsumoHitMangan": 7
    			},
    			"calls": {
    				"openedHands": 200,
    				"total": 313,
    				"opportunities": 1899,
    				"repeatOpportunities": 51,
    				"kans": {
    					"ankan": 5,
    					"daiminkan": 1,
    					"rinshan": 1,
    					"shouminkan": 5,
    					"shouminkanRobbed": 1
    				}
    			},
    			"wins": {
    				"dama": {
    					"points": 114900,
    					"total": 15
    				},
    				"riichi": {
    					"points": 438400,
    					"total": 56
    				},
    				"open": {
    					"points": 306200,
    					"total": 69
    				},
    				"tsumo": 64
    			},
    			"dealins": {
    				"open": {
    					"dama": {
    						"points": 8000,
    						"total": 1
    					},
    					"riichi": {
    						"points": 78200,
    						"total": 11
    					},
    					"open": {
    						"points": 65700,
    						"total": 12
    					}
    				},
    				"riichi": {
    					"dama": {
    						"points": 8000,
    						"total": 1
    					},
    					"riichi": {
    						"points": 5200,
    						"total": 2
    					},
    					"open": {
    						"points": 24300,
    						"total": 5
    					}
    				},
    				"dama": {
    					"dama": {
    						"points": 28700,
    						"total": 5
    					},
    					"riichi": {
    						"points": 36400,
    						"total": 9
    					},
    					"open": {
    						"points": 105600,
    						"total": 25
    					}
    				}
    			},
    			"draws": {
    				"total": 86,
    				"tenpai": 34,
    				"open": 30,
    				"riichi": 12
    			}
    		}
    	}
    }
```

响应数据包 - player=66ce0448a09265ad1e0180f6

```json
    {
    	"66c59c24a09265ad1e0180e2": {
    		"version": 3,
    		"stats": {
    			"gamesPlayed": 48,
    			"totalHands": 593,
    			"totalRank": 112,
    			"totalHaipaiShanten": 2169,
    			"uraDora": 23,
    			"akaDora": 73,
    			"riichi": {
    				"total": 102,
    				"uraHit": 19,
    				"first": 81,
    				"chase": 21,
    				"chased": 14,
    				"furiten": 4,
    				"ippatsu": 10
    			},
    			"dealer": {
    				"tsumoHit": 37,
    				"tsumoHitPoints": 110400,
    				"tsumoHitMangan": 7
    			},
    			"calls": {
    				"openedHands": 200,
    				"total": 313,
    				"opportunities": 1899,
    				"repeatOpportunities": 51,
    				"kans": {
    					"ankan": 5,
    					"daiminkan": 1,
    					"rinshan": 1,
    					"shouminkan": 5,
    					"shouminkanRobbed": 1
    				}
    			},
    			"wins": {
    				"dama": {
    					"points": 114900,
    					"total": 15
    				},
    				"riichi": {
    					"points": 438400,
    					"total": 56
    				},
    				"open": {
    					"points": 306200,
    					"total": 69
    				},
    				"tsumo": 64
    			},
    			"dealins": {
    				"open": {
    					"dama": {
    						"points": 8000,
    						"total": 1
    					},
    					"riichi": {
    						"points": 78200,
    						"total": 11
    					},
    					"open": {
    						"points": 65700,
    						"total": 12
    					}
    				},
    				"riichi": {
    					"dama": {
    						"points": 8000,
    						"total": 1
    					},
    					"riichi": {
    						"points": 5200,
    						"total": 2
    					},
    					"open": {
    						"points": 24300,
    						"total": 5
    					}
    				},
    				"dama": {
    					"dama": {
    						"points": 28700,
    						"total": 5
    					},
    					"riichi": {
    						"points": 36400,
    						"total": 9
    					},
    					"open": {
    						"points": 105600,
    						"total": 25
    					}
    				}
    			},
    			"draws": {
    				"total": 86,
    				"tenpai": 34,
    				"open": 30,
    				"riichi": 12
    			}
    		}
    	}
    }
```

## 列举比赛役满

### 接口

```GET /contests/{contestId}/yakuman```

### 功能描述

用于获取{contestId}指定比赛的役满和了信息

### Content-Type

```application/json```

### 返回

-   List\[\]:
-   player: [Player](#player) 和出役满的选手信息
-   han: List\[int\] 和出的[役种编号](yakumanhan.txt)
-   game:
    -   endTime: int 比赛结束时间戳（毫秒）
    -   majsoulId: string 雀魂牌谱链接

### 示例

响应数据包

```json
    [
    	{
    		"player": {
    			"_id": "66ce06d5a09265ad1e0180fe",
    			"nickname": "一番即正义",
    			"zone": null
    		},
    		"han": [
    			38
    		],
    		"game": {
    			"endTime": 1726144090000,
    			"majsoulId": "240912-d2d76bdf-858d-43cf-97ca-38959844a373"
    		}
    	},
    	{
    		"player": {
    			"_id": "66c59c78a09265ad1e0180e3",
    			"nickname": "pasdzxcf",
    			"zone": null
    		},
    		"han": [
    			42
    		],
    		"game": {
    			"endTime": 1729859672000,
    			"majsoulId": "241025-0ec300c7-c80b-4820-9f52-49706564843d"
    		}
    	}
    ]
```

## 获取选手playerId


### 接口

```GET /players```

### 功能描述

用于根据选手昵称获取所有符合搜索条件的选手{playerId}信息

### Content-Type

```application/json```

### 参数

-   name: string 选手昵称搜索条件

### 返回

-   List\[\]:
-   \_id: string 选手{playerId}
-   nickname： string 选手雀魂昵称
-   displayName: string （可选）选手大鸭鸭显示昵称

### 示例

响应数据包 - name=爱情

```json
    [
    	{
    		"_id": "65ed691c3b1dac6834746992",
    		"nickname": "爱情海岛",
    		"displayName": "<逆天>爱情海岛<逆天>"
    	}
    ]
```

## 列举/搜索比赛选手列表


### 接口

```GET contests/{contestId}/players```

### 功能描述

用于获取{contestId}指定比赛的选手列表

### Content-Type

```application/json```

### 参数

-   teamId: string （可选）获取{teamId}指定队伍/阵营的选手
-   phaseIndex: int （可选）获取指定比赛阶段选手得分数据

### 返回

-   \_id: string 选手的{playerId}
-   tourneyScore: int 选手的赛事总得点
-   tourneyRank: int 选手的赛事/队内排名
-   gamesPlayed: int 选手的赛事比赛次数
-   nickname: string 选手昵称
-   zone: Optional\[int\] 选手服务器归属覆盖 默认为null

### 示例

响应数据包 - team=66c59c24a09265ad1e0180e2

```json
    [
    	{
    		"_id": "66c59c78a09265ad1e0180e3",
    		"tourneyScore": 331100,
    		"tourneyRank": 0,
    		"gamesPlayed": 16,
    		"team": {
    			"teams": [],
    			"seeded": false
    		},
    		"nickname": "pasdzxcf",
    		"zone": null
    	},
    	{
    		"_id": "66ce0448a09265ad1e0180f6",
    		"tourneyScore": 136300,
    		"tourneyRank": 1,
    		"gamesPlayed": 14,
    		"team": {
    			"teams": [],
    			"seeded": false
    		},
    		"nickname": "言依绫",
    		"zone": null
    	},
    	{
    		"_id": "66ce0490a09265ad1e0180f7",
    		"tourneyScore": -47900,
    		"tourneyRank": 2,
    		"gamesPlayed": 9,
    		"team": {
    			"teams": [],
    			"seeded": false
    		},
    		"nickname": "齐木濑",
    		"zone": null
    	},
    	{
    		"_id": "66ce04bca09265ad1e0180f8",
    		"tourneyScore": -129100,
    		"tourneyRank": 3,
    		"gamesPlayed": 9,
    		"team": {
    			"teams": [],
    			"seeded": false
    		},
    		"nickname": "助けて麻雀神様",
    		"zone": null
    	}
    ]
```

## 搜索选手牌谱

### 接口

```GET /contests/{contestId}/players/{playerId}/games```

### 功能描述

用于获取{contestId}指定比赛的{playerId}指定选手的牌谱

### Content-Type

```application/json```

### 返回

-   \_id: string 牌谱的{gameId}
-   majsoulId: string 雀魂牌谱链接
-   contestMajsoulId: string 雀魂赛事后台API用5位/8位赛事ID
-   gamesPlayed: int 选手的赛事比赛次数
-   end\_time: int 比赛结束时间戳（毫秒）

## 获取牌谱详细数据

### 接口

```GET /games/{gameId}```

### 功能描述

用于获取{gameId}指定牌谱的详细数据

### Content-Type

```application/json```

### 返回

-   \_id: string 牌谱的{gameId}
-   majsoulId: string 雀魂牌谱链接
-   contestMajsoulId: string 雀魂赛事后台API用5位/8位赛事ID
-   gamesPlayed: int 选手的赛事比赛次数
-   end\_time: int 比赛结束时间戳（毫秒）

## 获取团队赛赛程信息

### 接口

```GET /contests/{contestId}/sessions```

### 功能描述

用于获取{contestId}指定比赛的赛程数据

### Content-Type

```application/json```

### 返回

-   List\[[Session](#session)\]: 一个包含Session对象的List

### 示例

响应数据包

```json
    [
    	{
    		"_id": "66ce0904a09265ad1e018104",
    		"scheduledTime": 1725278400000,
    		"contestId": "66c59871a09265ad1e0180d8",
    		"plannedMatches": [
    			{
    				"teams": [
    					{
    						"_id": "66c59a25a09265ad1e0180d9"
    					},
    					{
    						"_id": "66c59abba09265ad1e0180da"
    					},
    					{
    						"_id": "66c59b06a09265ad1e0180db"
    					},
    					{
    						"_id": "66c59b44a09265ad1e0180dc"
    					}
    				]
    			},
    			{
    				"teams": [
    					{
    						"_id": "66c59b70a09265ad1e0180dd"
    					},
    					{
    						"_id": "66c59baea09265ad1e0180df"
    					},
    					{
    						"_id": "66c59bffa09265ad1e0180e1"
    					},
    					{
    						"_id": "66c59c24a09265ad1e0180e2"
    					}
    				]
    			},
    			{
    				"teams": [
    					{
    						"_id": "66c59ca4a09265ad1e0180e4"
    					},
    					{
    						"_id": "66c59cd9a09265ad1e0180e5"
    					},
    					{
    						"_id": "66c59d0da09265ad1e0180e6"
    					},
    					{
    						"_id": "66c59d4aa09265ad1e0180e7"
    					}
    				]
    			},
    			{
    				"teams": [
    					{
    						"_id": "66c59d7ca09265ad1e0180e8"
    					},
    					{
    						"_id": "66c59dafa09265ad1e0180e9"
    					},
    					{
    						"_id": "66c59ddda09265ad1e0180ea"
    					},
    					{
    						"_id": "66c59e0ca09265ad1e0180eb"
    					}
    				]
    			}
    		],
    		"name": "常规赛1",
    		"totals": {
    			"66c59a25a09265ad1e0180d9": 86500,
    			"66c59abba09265ad1e0180da": -91000,
    			"66c59b06a09265ad1e0180db": -64600,
    			"66c59b44a09265ad1e0180dc": 69100,
    			"66c59b70a09265ad1e0180dd": -21400,
    			"66c59baea09265ad1e0180df": -12600,
    			"66c59bffa09265ad1e0180e1": 40500,
    			"66c59c24a09265ad1e0180e2": -6500,
    			"66c59ca4a09265ad1e0180e4": 400,
    			"66c59cd9a09265ad1e0180e5": 600,
    			"66c59d0da09265ad1e0180e6": -2500,
    			"66c59d4aa09265ad1e0180e7": 1500,
    			"66c59d7ca09265ad1e0180e8": 34200,
    			"66c59dafa09265ad1e0180e9": -39000,
    			"66c59ddda09265ad1e0180ea": 54400,
    			"66c59e0ca09265ad1e0180eb": -49600
    		},
    		"aggregateTotals": {
    			"66c59a25a09265ad1e0180d9": 86500,
    			"66c59abba09265ad1e0180da": -91000,
    			"66c59b06a09265ad1e0180db": -64600,
    			"66c59b44a09265ad1e0180dc": 69100,
    			"66c59b70a09265ad1e0180dd": -21400,
    			"66c59baea09265ad1e0180df": -12600,
    			"66c59bffa09265ad1e0180e1": 40500,
    			"66c59c24a09265ad1e0180e2": -6500,
    			"66c59ca4a09265ad1e0180e4": 400,
    			"66c59cd9a09265ad1e0180e5": 600,
    			"66c59d0da09265ad1e0180e6": -2500,
    			"66c59d4aa09265ad1e0180e7": 1500,
    			"66c59d7ca09265ad1e0180e8": 34200,
    			"66c59dafa09265ad1e0180e9": -39000,
    			"66c59ddda09265ad1e0180ea": 54400,
    			"66c59e0ca09265ad1e0180eb": -49600
    		}
    	}, ...
    ]
```

## 获取团队赛当前赛程信息

### 接口

```GET /contests/{contestId}/sessions/active```

### 功能描述

用于获取{contestId}指定比赛正在进行的赛程轮次

### Content-Type

```application/json```

### 返回

-   一个 [Session](#session) 对象

### 示例

响应数据包

```json
    {
    	"_id": "670e7716a6e0335fe8e119d6",
    	"scheduledTime": 1729857600000,
    	"contestId": "66c59871a09265ad1e0180d8",
    	"plannedMatches": [
    		{
    			"teams": [
    				{
    					"_id": "66c59d7ca09265ad1e0180e8"
    				},
    				{
    					"_id": "66c59c24a09265ad1e0180e2"
    				},
    				{
    					"_id": "66c59d0da09265ad1e0180e6"
    				},
    				{
    					"_id": "66c59cd9a09265ad1e0180e5"
    				}
    			]
    		}
    	],
    	"name": "决赛6",
    	"totals": {
    		"66c59c24a09265ad1e0180e2": 80900,
    		"66c59cd9a09265ad1e0180e5": -26100,
    		"66c59d0da09265ad1e0180e6": -27300,
    		"66c59d7ca09265ad1e0180e8": -27500
    	},
    	"aggregateTotals": {
    		"66c59c24a09265ad1e0180e2": 91850,
    		"66c59cd9a09265ad1e0180e5": 4825,
    		"66c59d0da09265ad1e0180e6": 110200,
    		"66c59d7ca09265ad1e0180e8": 142675
    	}
    }
```

## 获取赛事比赛阶段

### 接口

```GET /contests/{contestId}/phases/```

### 功能描述

用于获取{contestId}指定比赛的所有比赛阶段

### Content-Type

```application/json```

### 返回

-   List\[[Phase](#phase)\]: 一个包含Phase对象的List

### 示例

响应数据包

```json
    [
    	{
    		"name": "常规赛",
    		"startTime": 0,
    		"index": 0,
    		"sessions": [...],
    		"aggregateTotals": {
    			"66c59a25a09265ad1e0180d9": 0,
    			"66c59abba09265ad1e0180da": 0,
    			"66c59b06a09265ad1e0180db": 0,
    			"66c59b44a09265ad1e0180dc": 0,
    			"66c59b70a09265ad1e0180dd": 0,
    			"66c59baea09265ad1e0180df": 0,
    			"66c59bffa09265ad1e0180e1": 0,
    			"66c59c24a09265ad1e0180e2": 0,
    			"66c59ca4a09265ad1e0180e4": 0,
    			"66c59cd9a09265ad1e0180e5": 0,
    			"66c59d0da09265ad1e0180e6": 0,
    			"66c59d4aa09265ad1e0180e7": 0,
    			"66c59d7ca09265ad1e0180e8": 0,
    			"66c59dafa09265ad1e0180e9": 0,
    			"66c59ddda09265ad1e0180ea": 0,
    			"66c59e0ca09265ad1e0180eb": 0
    		}
    	},
    	{
    		"name": "半决赛",
    		"startTime": 1726848000000,
    		"index": 1,
    		"sessions": [...],
    		"aggregateTotals": {
    			"66c59b44a09265ad1e0180dc": 74000,
    			"66c59b70a09265ad1e0180dd": 40550,
    			"66c59bffa09265ad1e0180e1": 115050,
    			"66c59c24a09265ad1e0180e2": 83100,
    			"66c59cd9a09265ad1e0180e5": 47250,
    			"66c59d0da09265ad1e0180e6": 10600,
    			"66c59d7ca09265ad1e0180e8": 122850,
    			"66c59ddda09265ad1e0180ea": 124100
    		}
    	},
    	{
    		"name": "决赛",
    		"startTime": 1729008000000,
    		"index": 2,
    		"sessions": [...],
    		"aggregateTotals": {
    			"66c59c24a09265ad1e0180e2": 115450,
    			"66c59cd9a09265ad1e0180e5": 24825,
    			"66c59d0da09265ad1e0180e6": 59400,
    			"66c59d7ca09265ad1e0180e8": 149875
    		}
    	}
    ]
```

## 获取赛事当前比赛阶段

### 接口

```GET /contests/{contestId}/phases/active```

### 功能描述

用于获取{contestId}指定比赛的当前比赛阶段

### Content-Type

```application/json```

### 返回

-   一个 [Phase](#phase) 对象

### 示例

响应数据包

```json
    {
    	"name": "决赛",
    	"startTime": 1729008000000,
    	"index": 2,
    	"sessions": [...],
    	"aggregateTotals": {
    		"66c59c24a09265ad1e0180e2": 115450,
    		"66c59cd9a09265ad1e0180e5": 24825,
    		"66c59d0da09265ad1e0180e6": 59400,
    		"66c59d7ca09265ad1e0180e8": 149875
    	}
    }
```

## 获取赛事指定比赛阶段

### 接口

```GET /contests/{contestId}/phases/{phaseIndex}```

### 功能描述

用于获取{contestId}指定比赛的{phaseIndex}指定比赛阶段

### Content-Type

```application/json```

### 返回

-   一个 [Phase](#phase) 对象

### 示例

响应数据包 - phaseIndex=1

```json
    {
    	"name": "半决赛",
    	"startTime": 1726848000000,
    	"index": 1,
    	"sessions": [...],
    	"aggregateTotals": {
    		"66c59b44a09265ad1e0180dc": 74000,
    		"66c59b70a09265ad1e0180dd": 40550,
    		"66c59bffa09265ad1e0180e1": 115050,
    		"66c59c24a09265ad1e0180e2": 83100,
    		"66c59cd9a09265ad1e0180e5": 47250,
    		"66c59d0da09265ad1e0180e6": 10600,
    		"66c59d7ca09265ad1e0180e8": 122850,
    		"66c59ddda09265ad1e0180ea": 124100
    	}
    }
```

## 对象列表

### Team

-   \_id: string 队伍{TeamId}
-   color: string （可选）队伍代表色【ARGB 的 HEX 十六进制颜色值】
-   name: string 队伍名称
-   altName: string （可选）队伍彩蛋名称
-   players: List\[[Player](#player)\] 队伍选手列表
-   image: string （可选）以base64格式存储的队伍Logo
-   altImage: string （可选）以base64格式存储的队伍Logo【彩蛋】
-   hidePlayers: boolean 是否隐藏队伍选手个人信息 默认为false

### Player

-   \_id: string 选手{PlayerId}
-   nickname: string 选手雀魂昵称，若有大鸭鸭displayName则会被覆盖
-   zone: Optional\[int\] 选手服务器归属覆盖 默认为null

### Session

-   \_id: string 赛程轮次的{sessionId}
-   scheduledTime: int 赛程轮次开始时间戳（毫秒）
-   contestId: string 大鸭鸭比赛contestId
-   plannedMatches: List\[Match\] 赛程比赛列表
    -   teams: List\[application/json\] 每场比赛的队伍对阵列表
    -   \_id: str 参赛队伍的{teamId}
-   name: string 赛程轮次名称
-   totals: application/json 队伍当轮得分数据
-   aggregateTotals: application/json 队伍截止当前轮次通算得分数据

### Phase

-   name: string 赛事阶段名称
-   startTime: int 赛事阶段开始时间戳（毫秒）
-   index: int 赛事阶段{phaseIndex}
-   sessions: List\[[Session](#session)\] 当前阶段赛程列表
-   aggregateTotals: application/json 队伍当前阶段通算得分数据