<template>
    <section class="flex-a-i flex-v">
        <!-- total -->
        <header class="total-wrap flex-h">
            <div class="label flex-a-i">合计</div>
            <div class="item">
                <p class="num" :class="[{ 'num-large' : total.hold_profit.length < 4 }, { 'num-middle' : total.hold_profit.length > 3 && total.hold_profit.length < 6 }, { 'num-small' : total.hold_profit.length > 5 }, { 'color-green' : total.hold_profit < 0 }, { 'color-red' : total.hold_profit > 0 }]">{{ total.hold_profit }}</p>
                <p class="text">持仓盈亏</p>
            </div>
            <div class="item">
                <p class="num" :class="[{ 'num-large' : total.close_profit.length < 4 }, { 'num-middle' : total.close_profit.length > 3 && total.close_profit.length < 6 }, { 'num-small' : total.close_profit.length > 5 }, { 'color-green' : total.close_profit < 0 }, { 'color-red' : total.close_profit > 0 }]">{{ total.close_profit }}</p>
                <p class="text">平仓盈亏</p>
            </div>
            <div class="item">
                <p class="num" :class="[{ 'num-large' : total.fee.length < 4 }, { 'num-middle' : total.fee.length > 3 && total.fee.length < 6 }, { 'num-small' : total.fee.length > 5 }]">{{ total.fee }}</p>
                <p class="text">手续费</p>
            </div>
            <div class="line"></div>
            <div class="item">
                <p class="num" :class="[{ 'num-large' : total.equity.length < 4 }, { 'num-middle' : total.equity.length > 3 && total.equity.length < 6 }, { 'num-small' : total.equity.length > 5 }]">{{ total.equity }}</p>
                <p class="text">动态权益</p>
            </div>
            <div class="item">
                <p class="num" :class="[{ 'num-large' : total.available.length < 4 }, { 'num-middle' : total.available.length > 3 && total.available.length < 6 }, { 'num-small' : total.available.length > 5 }]">{{ total.available }}</p>
                <p class="text">可用资金</p>
            </div>
        </header>
        <!-- content -->
        <section class="flex-a-i flex-h">
            <!-- left aside -->
            <aside class="left-side">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <div class="label">策略管理</div>
                        <div class="btn-wrap">
                            <i class="iconfont icon-shuaxin cursor-pointer" @click="handleRefreshStrategy"></i>
                        </div>
                    </div>
                    <div class="left-nav">
                        <div class="nav-item" v-for="(item, index) in strategies" :key="item.strategyID">
                            <i class="iconfont icon-zizuan color-green" :class="[{ 'color-green': item.status == 'STARTED' }, { 'color-orange': item.status == 'STOPPED' }, { 'color-grey': item.status == 'CREATED' }, { 'color-light': item.status == '' }]"></i>
                            <span class="name">{{ item.strategyID }}</span>
                        </div>
                    </div>
                </el-card>
            </aside>
            <!-- right aside -->
            <main class="right-side flex-a-i flex-v">
                <!-- 策略运行 -->
                <section class="section-block">
                    <el-card class="box-card" shadow="never">
                        <div slot="header" class="clearfix">
                            <div class="label">策略运行</div>
                            <div class="btn-wrap" v-if="running.tableData.length > 0">
                                <!-- 全选 -->
                                <i class="iconfont icon-duoxuankuang" @click="handleTableAllSelected">
                                    <i class="iconfont icon-xuanzhong"></i>
                                </i>
                                <!-- 全不选 -->
                                <i class="iconfont icon-duoxuankuang" @click="handleTableAllUnSelected"></i>
                                <!-- 分割线 -->
                                <i class="line">&nbsp;</i>
                                <!-- 启动 -->
                                <el-popover placement="bottom" width="170" v-model="running.visible.start" :disabled="running.multipleIds.length == 0">
                                    <p style="line-height: 2;">确定启动所选的策略？</p>
                                    <div style="text-align: right; margin: 10px 0 0 0;">
                                        <el-button size="mini" type="text" @click="running.visible.start = false">取消</el-button>
                                        <el-button type="primary" size="mini" :loading="running.visible.startLoading" @click="handleStrategyOperate('start')">确定</el-button>
                                    </div>

                                    <i class="iconfont icon-bofang5" slot="reference" :disabled="running.multipleIds.length == 0"></i>
                                </el-popover>
                                <!-- 暂停 -->
                                <el-popover placement="bottom" width="170" v-model="running.visible.pause" :disabled="running.multipleIds.length == 0" style="margin-left: 10px;">
                                    <p style="line-height: 2;">确定暂停所选的策略？</p>
                                    <div style="text-align: right; margin: 10px 0 0 0;">
                                        <el-button size="mini" type="text" @click="running.visible.pause = false">取消</el-button>
                                        <el-button type="primary" size="mini" :loading="running.visible.pauseLoading" @click="handleStrategyOperate('pause')">确定</el-button>
                                    </div>

                                    <i class="iconfont icon-zanting" slot="reference" :disabled="running.multipleIds.length == 0"></i>
                                </el-popover>
                                <!-- 停止 -->
                                <el-popover placement="bottom" width="170" v-model="running.visible.stop" :disabled="running.multipleIds.length == 0" style="margin-left: 10px;">
                                    <p style="line-height: 2;">确定停止所选的策略？</p>
                                    <div style="text-align: right; margin: 10px 0 0 0;">
                                        <el-button size="mini" type="text" @click="running.visible.stop = false">取消</el-button>
                                        <el-button type="primary" size="mini" :loading="running.visible.stopLoading" @click="handleStrategyOperate('stop')">确定</el-button>
                                    </div>

                                    <i class="iconfont icon-zanting1" slot="reference" :disabled="running.multipleIds.length == 0"></i>
                                </el-popover>
                                <!-- 删除 -->
                                <el-popover placement="bottom" width="170" v-model="running.visible.delete" :disabled="running.multipleIds.length == 0" style="margin-left: 10px;">
                                    <p style="line-height: 2;">确定删除所选的策略？</p>
                                    <div style="text-align: right; margin: 10px 0 0 0;">
                                        <el-button size="mini" type="text" @click="running.visible.delete = false">取消</el-button>
                                        <el-button type="primary" size="mini" :loading="running.visible.deleteLoading" @click="handleStrategyOperate('delete')">确定</el-button>
                                    </div>

                                    <i class="iconfont icon-cha" slot="reference" :disabled="running.multipleIds.length == 0"></i>
                                </el-popover>
                            </div>
                        </div>
                        <div class="left-nav">
                            <el-table :data="running.tableData" style="width: 100%;" height="298" ref="multipleTable" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="25"></el-table-column>
                                <el-table-column label="" width="30" style="padding: 0;">
                                    <template slot-scope="scope">
                                        <i class="iconfont icon-tubiaozhizuo- color-red" v-if="scope.row.redpoint"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column label="策略名称">
                                    <template slot-scope="scope">{{ scope.row.strategyID }}</template>
                                </el-table-column>
                                <el-table-column label="启动⽅式">
                                    <template slot-scope="scope">{{ scope.row.autoStart ? '自动' : '手动' }}</template>
                                </el-table-column>
                                <el-table-column label="状态">
                                    <template slot-scope="scope">
                                        <i class="iconfont icon-bofang5 color-green" v-if="scope.row.status == 'STARTED'"></i>
                                        <i class="iconfont icon-zanting color-orange" v-if="scope.row.status == 'STOPPED'"></i>
                                        <i class="iconfont icon-zanting1 color-red" v-if="scope.row.status == 'CREATED'"></i>
                                        <i class="iconfont icon-zanting1 color-red" v-if="scope.row.status == ''"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column label="合约">
                                    <template slot-scope="scope">{{ scope.row.symbols.join('，') }}</template>
                                </el-table-column>
                                <el-table-column label="账号">
                                    <template slot-scope="scope">{{ scope.row.investor }}</template>
                                </el-table-column>
                                <el-table-column label="行情数">
                                    <template slot-scope="scope">{{ scope.row.quotes }}</template>
                                </el-table-column>
                                <el-table-column label="平仓盈亏">
                                    <template slot-scope="scope">{{ scope.row.closeProfit }}</template>
                                </el-table-column>
                                <el-table-column label="持仓盈亏">
                                    <template slot-scope="scope">{{ scope.row.holdProfit }}</template>
                                </el-table-column>
                                <el-table-column label="备注">
                                    <template slot-scope="scope">{{ scope.row.desc }}</template>
                                </el-table-column>
                                <el-table-column label="">
                                    <template slot-scope="scope">
                                        <i class="iconfont icon-tubiao color-blue" style="cursor: pointer;" @click="handleShowChartModal(scope.row)"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </section>
                <!-- 账户持仓 策略持仓 委托视图 成交视图 -->
                <section class="section-block flex-a-i">
                    <el-tabs v-model="tabs.activeName">
                        <el-tab-pane label="账户持仓" name="accountHoldPosition">
                            <el-table :data="tabs.accountHoldPosition.tableData" style="width: 100%;" height="calc(100vh - 298px - 300px)">
                                <el-table-column label="交易账号">
                                    <template slot-scope="scope">{{ scope.row.investor }}</template>
                                </el-table-column>
                                <el-table-column label="合约">
                                    <template slot-scope="scope">{{ scope.row.symbol }}</template>
                                </el-table-column>
                                <el-table-column label="合约名称">
                                    <template slot-scope="scope">{{ scope.row.instrumentName }}</template>
                                </el-table-column>
                                <el-table-column label="方向">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.direction == 'LONG'">买</p>
                                        <p v-if="scope.row.direction == 'SHORT'">卖</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="总持仓">
                                    <template slot-scope="scope">{{ scope.row.position }}</template>
                                </el-table-column>
                                <el-table-column label="昨仓">
                                    <template slot-scope="scope">{{ scope.row.ydPosition }}</template>
                                </el-table-column>
                                <el-table-column label="今仓">
                                    <template slot-scope="scope">{{ scope.row.tdPosition }}</template>
                                </el-table-column>
                                <el-table-column label="可平量">
                                    <template slot-scope="scope">{{ scope.row.available }}</template>
                                </el-table-column>
                                <el-table-column label="平仓挂单量">
                                    <template slot-scope="scope">{{ scope.row.exiting }}</template>
                                </el-table-column>
                                <el-table-column label="开仓均价">
                                    <template slot-scope="scope">{{ scope.row.avgPrice }}</template>
                                </el-table-column>
                                <el-table-column label="持仓盈亏">
                                    <template slot-scope="scope">{{ scope.row.holdProfit }}</template>
                                </el-table-column>
                                <el-table-column label="占⽤保证⾦">
                                    <template slot-scope="scope">{{ scope.row.usedMargin }}</template>
                                </el-table-column>
                                <!-- <el-table-column label="时间">
                                    <template slot-scope="scope">{{ scope.row.time }}</template>
                                </el-table-column> -->
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="策略持仓" name="strategyHoldPosition">
                            <el-table :data="tabs.strategyHoldPosition.tableData" style="width: 100%;" height="calc(100vh - 298px - 300px)">
                                <el-table-column label="策略名称">
                                    <template slot-scope="scope">{{ scope.row.strategyID }}</template>
                                </el-table-column>
                                <el-table-column label="交易账号">
                                    <template slot-scope="scope">{{ scope.row.investor }}</template>
                                </el-table-column>
                                <el-table-column label="合约">
                                    <template slot-scope="scope">{{ scope.row.symbol }}</template>
                                </el-table-column>
                                <el-table-column label="合约名称">
                                    <template slot-scope="scope">{{ scope.row.instrumentName }}</template>
                                </el-table-column>
                                <el-table-column label="方向">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.direction == 'LONG'">买</p>
                                        <p v-if="scope.row.direction == 'SHORT'">卖</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="当前仓">
                                    <template slot-scope="scope">{{ scope.row.position }}</template>
                                </el-table-column>
                                <el-table-column label="昨仓">
                                    <template slot-scope="scope">{{ scope.row.ydPosition }}</template>
                                </el-table-column>
                                <el-table-column label="今仓">
                                    <template slot-scope="scope">{{ scope.row.tdPosition }}</template>
                                </el-table-column>
                                <el-table-column label="可平量">
                                    <template slot-scope="scope">{{ scope.row.available }}</template>
                                </el-table-column>
                                <el-table-column label="挂单量">
                                    <template slot-scope="scope">{{ scope.row.hang }}</template>
                                </el-table-column>
                                <el-table-column label="开仓均价">
                                    <template slot-scope="scope">{{ scope.row.avgPrice }}</template>
                                </el-table-column>
                                <el-table-column label="持仓盈亏">
                                    <template slot-scope="scope">{{ scope.row.holdProfit }}</template>
                                </el-table-column>
                                <el-table-column label="平仓盈亏">
                                    <template slot-scope="scope">{{ scope.row.closeProfit }}</template>
                                </el-table-column>
                                <el-table-column label="⼿续费">
                                    <template slot-scope="scope">{{ scope.row.fee }}</template>
                                </el-table-column>
                                <el-table-column label="保证⾦">
                                    <template slot-scope="scope">{{ scope.row.usedMargin }}</template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="委托视图" name="delegateView">
                            <el-table :data="tabs.delegateView.tableData" style="width: 100%;" height="calc(100vh - 298px - 300px)">
                                <el-table-column label="策略略名称">
                                    <template slot-scope="scope">{{ scope.row.strategyID }}</template>
                                </el-table-column>
                                <el-table-column label="交易账号">
                                    <template slot-scope="scope">{{ scope.row.investor }}</template>
                                </el-table-column>
                                <el-table-column label="报单编号">
                                    <template slot-scope="scope">{{ scope.row.orderRef }}</template>
                                </el-table-column>
                                <el-table-column label="合约">
                                    <template slot-scope="scope">{{ scope.row.symbol }}</template>
                                </el-table-column>
                                <el-table-column label="合约名称">
                                    <template slot-scope="scope">{{ scope.row.instrumentName }}</template>
                                </el-table-column>
                                <el-table-column label="⽅向">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.direction == 'LONG'">买</p>
                                        <p v-if="scope.row.direction == 'SHORT'">卖</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="开平">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.offset == 'OPEN'">开</p>
                                        <p v-if="scope.row.offset == 'CLOSE'">平</p>
                                        <p v-if="scope.row.offset == 'CLOSE_YESTERDAY'">平昨</p>
                                        <p v-if="scope.row.offset == 'CLOSE_TODAY'">平今</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="挂单状态">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.orderStatus == 'ALL_TRADED'">全部成交</p>
                                        <p v-if="scope.row.orderStatus == 'PART_TRADED'">部分成交</p>
                                        <p v-if="scope.row.orderStatus == 'NO_TRADE'">未成交</p>
                                        <p v-if="scope.row.orderStatus == 'CANCELED'">已撤单</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="报单手数">
                                    <template slot-scope="scope">{{ scope.row.inputVol }}</template>
                                </el-table-column>
                                <el-table-column label="报单价格">
                                    <template slot-scope="scope">{{ scope.row.inputPrice }}</template>
                                </el-table-column>
                                <el-table-column label="未成交手数">
                                    <template slot-scope="scope">{{ scope.row.remainVol }}</template>
                                </el-table-column>
                                <el-table-column label="成交手数">
                                    <template slot-scope="scope">{{ scope.row.tradeVol }}</template>
                                </el-table-column>
                                <el-table-column label="成交均价">
                                    <template slot-scope="scope">{{ scope.row.avgPrice }}</template>
                                </el-table-column>
                                <el-table-column label="交易日期">
                                    <template slot-scope="scope">{{ scope.row.tradingDay }}</template>
                                </el-table-column>
                                <el-table-column label="委托时间">
                                    <template slot-scope="scope">{{ scope.row.orderTime }}</template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="成交视图" name="bargainView">
                            <el-table :data="tabs.bargainView.tableData" style="width: 100%;" height="calc(100vh - 298px - 300px)">
                                <el-table-column label="策略名称">
                                    <template slot-scope="scope">{{ scope.row.strategyID }}</template>
                                </el-table-column>
                                <el-table-column label="交易账号">
                                    <template slot-scope="scope">{{ scope.row.investor }}</template>
                                </el-table-column>
                                <el-table-column label="成交编号">
                                    <template slot-scope="scope">{{ scope.row.tradeID }}</template>
                                </el-table-column>
                                <el-table-column label="合约">
                                    <template slot-scope="scope">{{ scope.row.symbol }}</template>
                                </el-table-column>
                                <el-table-column label="合约名称">
                                    <template slot-scope="scope">{{ scope.row.instrumentName }}</template>
                                </el-table-column>
                                <el-table-column label="⽅向">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.direction == 'LONG'">买</p>
                                        <p v-if="scope.row.direction == 'SHORT'">卖</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="开平">
                                    <template slot-scope="scope">
                                        <p v-if="scope.row.offset == 'OPEN'">开</p>
                                        <p v-if="scope.row.offset == 'CLOSE'">平</p>
                                        <p v-if="scope.row.offset == 'CLOSE_YESTERDAY'">平昨</p>
                                        <p v-if="scope.row.offset == 'CLOSE_TODAY'">平今</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="价格">
                                    <template slot-scope="scope">{{ scope.row.tradePrice }}</template>
                                </el-table-column>
                                <el-table-column label="⼿数">
                                    <template slot-scope="scope">{{ scope.row.tradeVol }}</template>
                                </el-table-column>
                                <el-table-column label="成交时间">
                                    <template slot-scope="scope">{{ scope.row.tradeTime }}</template>
                                </el-table-column>
                                <el-table-column label="成交日期">
                                    <template slot-scope="scope">{{ scope.row.tradingDay }}</template>
                                </el-table-column>
                                <el-table-column label="报单编号">
                                    <template slot-scope="scope">{{ scope.row.orderRef }}</template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </section>
            </main>
        </section>

        <!-- 策略运行图表 -->
        <el-dialog :title="running.dialogInfo.title" :visible.sync="running.dialogInfo.visible" custom-class="chart-dialog">
            <div class="chart-wrap" v-loading="running.dialogInfo.loading" id="chart"></div>
        </el-dialog>
    </section>
</template>
<script>
    // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
    var data0 = splitData([
        ['2013/1/24', 2320.26,2320.26,2287.3,2362.94],
        ['2013/1/25', 2300,2291.3,2288.26,2308.38],
        ['2013/1/28', 2295.35,2346.5,2295.35,2346.92],
        ['2013/1/29', 2347.22,2358.98,2337.35,2363.8],
        ['2013/1/30', 2360.75,2382.48,2347.89,2383.76],
        ['2013/1/31', 2383.43,2385.42,2371.23,2391.82],
        ['2013/2/1', 2377.41,2419.02,2369.57,2421.15],
        ['2013/2/4', 2425.92,2428.15,2417.58,2440.38],
        ['2013/2/5', 2411,2433.13,2403.3,2437.42],
        ['2013/2/6', 2432.68,2434.48,2427.7,2441.73],
        ['2013/2/7', 2430.69,2418.53,2394.22,2433.89],
        ['2013/2/8', 2416.62,2432.4,2414.4,2443.03],
        ['2013/2/18', 2441.91,2421.56,2415.43,2444.8],
        ['2013/2/19', 2420.26,2382.91,2373.53,2427.07],
        ['2013/2/20', 2383.49,2397.18,2370.61,2397.94],
        ['2013/2/21', 2378.82,2325.95,2309.17,2378.82],
        ['2013/2/22', 2322.94,2314.16,2308.76,2330.88],
        ['2013/2/25', 2320.62,2325.82,2315.01,2338.78],
        ['2013/2/26', 2313.74,2293.34,2289.89,2340.71],
        ['2013/2/27', 2297.77,2313.22,2292.03,2324.63],
        ['2013/2/28', 2322.32,2365.59,2308.92,2366.16],
        ['2013/3/1', 2364.54,2359.51,2330.86,2369.65],
        ['2013/3/4', 2332.08,2273.4,2259.25,2333.54],
        ['2013/3/5', 2274.81,2326.31,2270.1,2328.14],
        ['2013/3/6', 2333.61,2347.18,2321.6,2351.44],
        ['2013/3/7', 2340.44,2324.29,2304.27,2352.02],
        ['2013/3/8', 2326.42,2318.61,2314.59,2333.67],
        ['2013/3/11', 2314.68,2310.59,2296.58,2320.96],
        ['2013/3/12', 2309.16,2286.6,2264.83,2333.29],
        ['2013/3/13', 2282.17,2263.97,2253.25,2286.33],
        ['2013/3/14', 2255.77,2270.28,2253.31,2276.22],
        ['2013/3/15', 2269.31,2278.4,2250,2312.08],
        ['2013/3/18', 2267.29,2240.02,2239.21,2276.05],
        ['2013/3/19', 2244.26,2257.43,2232.02,2261.31],
        ['2013/3/20', 2257.74,2317.37,2257.42,2317.86],
        ['2013/3/21', 2318.21,2324.24,2311.6,2330.81],
        ['2013/3/22', 2321.4,2328.28,2314.97,2332],
        ['2013/3/25', 2334.74,2326.72,2319.91,2344.89],
        ['2013/3/26', 2318.58,2297.67,2281.12,2319.99],
        ['2013/3/27', 2299.38,2301.26,2289,2323.48],
        ['2013/3/28', 2273.55,2236.3,2232.91,2273.55],
        ['2013/3/29', 2238.49,2236.62,2228.81,2246.87],
        ['2013/4/1', 2229.46,2234.4,2227.31,2243.95],
        ['2013/4/2', 2234.9,2227.74,2220.44,2253.42],
        ['2013/4/3', 2232.69,2225.29,2217.25,2241.34],
        ['2013/4/8', 2196.24,2211.59,2180.67,2212.59],
        ['2013/4/9', 2215.47,2225.77,2215.47,2234.73],
        ['2013/4/10', 2224.93,2226.13,2212.56,2233.04],
        ['2013/4/11', 2236.98,2219.55,2217.26,2242.48],
        ['2013/4/12', 2218.09,2206.78,2204.44,2226.26],
        ['2013/4/15', 2199.91,2181.94,2177.39,2204.99],
        ['2013/4/16', 2169.63,2194.85,2165.78,2196.43],
        ['2013/4/17', 2195.03,2193.8,2178.47,2197.51],
        ['2013/4/18', 2181.82,2197.6,2175.44,2206.03],
        ['2013/4/19', 2201.12,2244.64,2200.58,2250.11],
        ['2013/4/22', 2236.4,2242.17,2232.26,2245.12],
        ['2013/4/23', 2242.62,2184.54,2182.81,2242.62],
        ['2013/4/24', 2187.35,2218.32,2184.11,2226.12],
        ['2013/4/25', 2213.19,2199.31,2191.85,2224.63],
        ['2013/4/26', 2203.89,2177.91,2173.86,2210.58],
        ['2013/5/2', 2170.78,2174.12,2161.14,2179.65],
        ['2013/5/3', 2179.05,2205.5,2179.05,2222.81],
        ['2013/5/6', 2212.5,2231.17,2212.5,2236.07],
        ['2013/5/7', 2227.86,2235.57,2219.44,2240.26],
        ['2013/5/8', 2242.39,2246.3,2235.42,2255.21],
        ['2013/5/9', 2246.96,2232.97,2221.38,2247.86],
        ['2013/5/10', 2228.82,2246.83,2225.81,2247.67],
        ['2013/5/13', 2247.68,2241.92,2231.36,2250.85],
        ['2013/5/14', 2238.9,2217.01,2205.87,2239.93],
        ['2013/5/15', 2217.09,2224.8,2213.58,2225.19],
        ['2013/5/16', 2221.34,2251.81,2210.77,2252.87],
        ['2013/5/17', 2249.81,2282.87,2248.41,2288.09],
        ['2013/5/20', 2286.33,2299.99,2281.9,2309.39],
        ['2013/5/21', 2297.11,2305.11,2290.12,2305.3],
        ['2013/5/22', 2303.75,2302.4,2292.43,2314.18],
        ['2013/5/23', 2293.81,2275.67,2274.1,2304.95],
        ['2013/5/24', 2281.45,2288.53,2270.25,2292.59],
        ['2013/5/27', 2286.66,2293.08,2283.94,2301.7],
        ['2013/5/28', 2293.4,2321.32,2281.47,2322.1],
        ['2013/5/29', 2323.54,2324.02,2321.17,2334.33],
        ['2013/5/30', 2316.25,2317.75,2310.49,2325.72],
        ['2013/5/31', 2320.74,2300.59,2299.37,2325.53],
        ['2013/6/3', 2300.21,2299.25,2294.11,2313.43],
        ['2013/6/4', 2297.1,2272.42,2264.76,2297.1],
        ['2013/6/5', 2270.71,2270.93,2260.87,2276.86],
        ['2013/6/6', 2264.43,2242.11,2240.07,2266.69],
        ['2013/6/7', 2242.26,2210.9,2205.07,2250.63],
        ['2013/6/13', 2190.1,2148.35,2126.22,2190.1]
    ]);

    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }


    let ws = null;

    import { API, SOCKET } from '@/common/api';

    export default {
        name: '',
        data() {
            return {
                token: localStorage.getItem('token'),

                total: { // 账户资金统计
                    hold_profit: '0',
                    close_profit: '0',
                    fee: '0',
                    equity: '0',
                    available: '0'
                },

                strategies: [], // 策略列表

                // 策略运行
                running: {
                    tableLoading: false,
                    tableData: [],

                    multipleSelected: [], // 选中的数据，完整的数据集合
                    multipleIds: [], // 选中数据的id集合

                    visible: { // 策略操作二次确认
                        start: false,
                        startLoading: false,

                        pause: false,
                        pauseLoading: false,

                        stop: false,
                        stopLoading: false,

                        delete: false,
                        deleteLoading: false
                    },

                    dialogInfo: {
                        visible: false,
                        loading: false,
                        title: '',
                        chart: null,
                        option: {
                            title: {
                                text: '上证指数',
                                left: 0
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross'
                                }
                            },
                            legend: {
                                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                            },
                            grid: {
                                left: '10%',
                                right: '10%',
                                bottom: '15%'
                            },
                            xAxis: {
                                type: 'category',
                                data: data0.categoryData,
                                scale: true,
                                boundaryGap : false,
                                axisLine: {onZero: false},
                                splitLine: {show: false},
                                splitNumber: 20,
                                min: 'dataMin',
                                max: 'dataMax'
                            },
                            yAxis: {
                                scale: true,
                                splitArea: {
                                    show: true
                                }
                            },
                            dataZoom: [
                                {
                                    type: 'inside',
                                    start: 50,
                                    end: 100
                                },
                                {
                                    show: true,
                                    type: 'slider',
                                    y: '90%',
                                    start: 50,
                                    end: 100
                                }
                            ],
                            series: [
                                {
                                    name: '日K',
                                    type: 'candlestick',
                                    data: data0.values,
                                    itemStyle: {
                                        normal: {
                                            color: '#ec0000',
                                            color0: '#8A0000',
                                            borderColor: '#00da3c',
                                            borderColor0: '#008F28'
                                        }
                                    },
                                    markPoint: {
                                        label: {
                                            normal: {
                                                formatter: function (param) {
                                                    return param != null ? Math.round(param.value) : '';
                                                }
                                            }
                                        },
                                        data: [
                                            {
                                                name: 'XX标点',
                                                coord: ['2013/5/31', 2300],
                                                value: 2300,
                                                itemStyle: {
                                                    normal: {color: 'rgb(41,60,85)'}
                                                }
                                            },
                                            {
                                                name: 'highest value',
                                                type: 'max',
                                                valueDim: 'highest'
                                            },
                                            {
                                                name: 'lowest value',
                                                type: 'min',
                                                valueDim: 'lowest'
                                            },
                                            {
                                                name: 'average value on close',
                                                type: 'average',
                                                valueDim: 'close'
                                            }
                                        ],
                                        tooltip: {
                                            formatter: function (param) {
                                                return param.name + '<br>' + (param.data.coord || '');
                                            }
                                        }
                                    },
                                    markLine: {
                                        symbol: ['none', 'none'],
                                        data: [
                                            [
                                                {
                                                    name: 'from lowest to highest',
                                                    type: 'min',
                                                    valueDim: 'lowest',
                                                    symbol: 'circle',
                                                    symbolSize: 10,
                                                    label: {
                                                        normal: {show: false},
                                                        emphasis: {show: false}
                                                    }
                                                },
                                                {
                                                    type: 'max',
                                                    valueDim: 'highest',
                                                    symbol: 'circle',
                                                    symbolSize: 10,
                                                    label: {
                                                        normal: {show: false},
                                                        emphasis: {show: false}
                                                    }
                                                }
                                            ],
                                            {
                                                name: 'min line on close',
                                                type: 'min',
                                                valueDim: 'close'
                                            },
                                            {
                                                name: 'max line on close',
                                                type: 'max',
                                                valueDim: 'close'
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: 'MA5',
                                    type: 'line',
                                    data: calculateMA(5),
                                    smooth: true,
                                    lineStyle: {
                                        normal: {opacity: 0.5}
                                    }
                                },
                                {
                                    name: 'MA10',
                                    type: 'line',
                                    data: calculateMA(10),
                                    smooth: true,
                                    lineStyle: {
                                        normal: {opacity: 0.5}
                                    }
                                },
                                {
                                    name: 'MA20',
                                    type: 'line',
                                    data: calculateMA(20),
                                    smooth: true,
                                    lineStyle: {
                                        normal: {opacity: 0.5}
                                    }
                                },
                                {
                                    name: 'MA30',
                                    type: 'line',
                                    data: calculateMA(30),
                                    smooth: true,
                                    lineStyle: {
                                        normal: {opacity: 0.5}
                                    }
                                }
                            ]
                        }
                    }
                },

                // 账户持仓 策略持仓 委托视图 成交视图
                tabs: {
                    activeName: 'accountHoldPosition',

                    // 账户持仓
                    accountHoldPosition: {
                        tableData: []
                    },

                    // 策略持仓
                    strategyHoldPosition: {
                        tableData: []
                    },

                    // 委托视图
                    delegateView: {
                        tableData: []
                    },

                    // 成交视图
                    bargainView: {
                        tableData: []
                    }
                }

            }
        },
        methods: {
            /**
             * [socketInit description] 初始化socket
             * @return {[type]} [description]
             */
            socketInit() {
                //判断当前浏览器是否支持WebSocket
                if ('WebSocket' in window) {
                    ws = new WebSocket('ws://' + SOCKET);
                } else {
                    alert('当前浏览器不支持 webSocket, 请更换最新版谷歌浏览器！')
                }

                //连接发生错误的回调方法
                ws.onerror = function () {
                    console.log("WebSocket连接发生错误");
                };

                //连接成功建立的回调方法
                ws.onopen = () => {
                    console.log("WebSocket连接成功");

                    this.pageInit();
                }

                //接收到消息的回调方法
                ws.onmessage = (event) => {
                    event = JSON.parse(event.data);

                    // console.log('msg', event)

                    if(event.error_code == 0) {
                        this.onMsgReceived(event.data_type, event);
                    } else {
                        this.$message({ message: event.error_msg, type: "error" });

                        if(event.error_code == 4011 || event.error_code == 4010) {
                            // 登录过期、无效
                            localStorage.removeItem('token');
                            this.$router.push({ path: '/login' });
                        }
                    }
                }

                //连接关闭的回调方法
                ws.onclose = function () {
                    console.log("WebSocket连接关闭");

                    this.socketInit();
                }

                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口。
                window.onbeforeunload = function () {
                    ws.close();
                }
            },

            /**
             * [pageInit description] 页面初始化
             * @return {[type]} [description]
             */
            pageInit() {
                // 获取策略列表
                this.handleRefreshStrategy();

                // 获取账户资金统计
                ws.send(JSON.stringify({
                    'method': 'account_total',
                    'token': this.token
                }));

                // 获取策略运行列表
                ws.send(JSON.stringify({
                    'method': 'deployed_strategies',
                    'token': this.token
                }));

                // 获取账户持仓
                ws.send(JSON.stringify({
                    'method': 'account_holds',
                    'token': this.token
                }));

                // 获取策略持仓
                ws.send(JSON.stringify({
                    'method': 'strategy_holds',
                    'token': this.token
                }));

                // 获取委托列表
                ws.send(JSON.stringify({
                    'method': 'orders',
                    'token': this.token
                }));

                // 获取成交列表
                ws.send(JSON.stringify({
                    'method': 'trades',
                    'token': this.token
                }));


                // ws.send(JSON.stringify(param))
            },
            /**
             * [onMsgReceived description] 接收到的 socket 数据
             * @param  {[type]} dataType [description] 数据类型
             * @param  {[type]} data     [description] 数据
             * @return {[type]}          [description]
             */
            onMsgReceived(dataType, res) {
                switch (dataType) {
                    case 'account_total': // 账户资金统计
                        this.total = {
                            hold_profit: '' + res.hold_profit,
                            close_profit: '' + res.close_profit,
                            fee: '' + res.fee,
                            equity: '' + res.equity,
                            available: '' + res.available
                        };
                        break;
                    case 'all_strategies': // 策略列表
                        this.strategies = res.data;
                        break;
                    case 'deployed_strategies': // 策略运行列表
                        this.running.tableData = res.data;

                        // 处理数据刷新时，数据更新造成的选中状态异常，以免影响后续启动、暂停、停止、删除等操作
                        this.$nextTick(() => {
                            if(res.data.length == 0) {
                                this.$refs.multipleTable.clearSelection();
                            } else {
                                if(this.running.multipleSelected.length == 0) {
                                    this.$refs.multipleTable.clearSelection();
                                } else {
                                    let rows = [],
                                        ids = [];
                                    for(let i = 0; i < res.data.length; i++) {
                                        if(this.running.multipleIds.indexOf(res.data[i].strategyID) > -1) {
                                            rows.push(res.data[i]);
                                            ids.push(res.data[i].strategyID);
                                        }
                                    }
                                    console.log(1)
                                    this.$refs.multipleTable.clearSelection();
                                    console.log(2)
                                    
                                    rows.forEach(row => {
                                        this.$refs.multipleTable.toggleRowSelection(row, true);
                                    });
                                }
                            }
                        })
                        break;
                    case 'account_holds': // 获取账户持仓
                        this.tabs.accountHoldPosition.tableData = res.data;
                        break;
                    case 'strategy_holds': // 获取策略持仓
                        this.tabs.strategyHoldPosition.tableData = res.data;
                        break;
                    case 'orders': // 获取委托列表
                        this.tabs.delegateView.tableData = res.data;
                        break;
                    case 'trades': // 获取成交列表
                        this.tabs.bargainView.tableData = res.data;
                        break;
                    default:
                        return false;
                }
            },
            /**
             * [description] 刷新策略列表
             * @return {[type]} [description]
             */
            handleRefreshStrategy() {
                ws.send(JSON.stringify({
                    'method': 'all_strategies',
                    'token': this.token
                }));
            },
            /**
             * [handleSelectionChange description] 策略运行 - 表格 - 选中效果变化
             * @param  {[type]} val [description] 选中的列的集合 [array]
             * @return {[type]}     [description]
             */
            handleSelectionChange(val) {
                let ids = [];

                if(val.length > 0) {
                    for(let i = 0; i < val.length; i++) {
                        ids.push(val[i].strategyID);
                    }
                }

                this.running.multipleSelected = val;
                this.running.multipleIds = ids;
            },
            /**
             * [handleTableAllSelected description] 策略运行 - 表格 - 全部选中
             * @return {[type]} [description]
             */
            handleTableAllSelected() {
                this.$refs.multipleTable.clearSelection();

                this.running.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, true);
                });
            },
            /**
             * [handleTableAllUnSelected description] 策略运行 - 表格 - 全部取消选中
             * @return {[type]} [description]
             */
            handleTableAllUnSelected() {
                this.$refs.multipleTable.clearSelection();
            },
            /**
             * [handleStrategyOperate description] 策略运行 - 表格 - 选中 - 操作
             * @param  {[type]} type [description] 操作类型
             * @return {[type]}      [description]
             */
            handleStrategyOperate: function(type) {
                let method = '',
                    loading = '',
                    text = '';
                switch (type) {
                    case 'start':
                        method = 'start_strategies';
                        loading = this.running.visible.startLoading;
                        text = '启动';
                        break;
                    case 'pause':
                        method = 'pause_strategies';
                        loading = this.running.visible.pauseLoading;
                        text = '暂停';
                        break;
                    case 'stop':
                        method = 'stop_strategies';
                        loading = this.running.visible.stopLoading;
                        text = '停止';
                        break;
                    case 'delete':
                        method = 'delete_strategies';
                        loading = this.running.visible.deleteLoading;
                        text = '删除';
                        break;
                    default:
                        return false;
                }

                loading = true;

                var params = {
                    method: method,
                    strategyIDs: this.running.multipleIds,
                    token: this.token
                };

                API(params).then(res => {
                    loading = false;

                    let { error_code, error_msg } = res;

                    if(error_code == 0){
                        this.$message({ message: '策略已' + text, type: "success" });
                        this.$refs.multipleTable.clearSelection();
                        ws.send(JSON.stringify({
                            'method': 'deployed_strategies',
                            'token': this.token
                        }));
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    loading = false;
                    this.$message.error('服务器异常');
                })
                
            },
            /**
             * [handleShowChartModal description] 策略运行 - 表格 - 查看图表
             * @param  {[type]} row [description] 查看那一列的数据
             * @return {[type]}     [description]
             */
            handleShowChartModal(row) {
                this.running.dialogInfo.title = row.name;
                this.running.dialogInfo.visible = true;

                setTimeout(() => {
                    this.running.dialogInfo.loading = true;
                    this.running.dialogInfo.chart = null;
                    this.running.dialogInfo.option = {};

                    ws.send(JSON.stringify({
                        'method': 'strategy_chart',
                        'strategyID': row.strategyID,
                        'token': this.token
                    }));

                    setTimeout(() => {
                        this.running.dialogInfo.loading = false;

                        // this.running.dialogInfo.chart = this.$echarts.init(document.getElementById('chart'));
                        // this.running.dialogInfo.chart.setOption(this.running.dialogInfo.option);
                    }, 1500);
                }, 1)
            }

        },
        mounted() {
            this.socketInit();
        }
    }

</script>
<style lang="scss" scoped>
    @import "../../common/styles/base/mixin-common";

    .total-wrap {
        background-color: #FFF;

        .label {
            color: #999;
            font-weight: bolder;
            font-size: 30px;
            line-height: 70px;
            padding-left: 15px;
        }

        .item {
            width: 14%;

            .num {
                font-size: 20px;
                line-height: 40px;
                height: 40px;
                font-weight: bolder;
                text-align: center;

                &.num-small {
                    font-size: 20px;
                }

                &.num-middle {
                    font-size: 22px;
                }

                &.num-normal {
                    font-size: 24px;
                }

                &.num-large {
                    font-size: 26px;
                }

                &.color-green {
                    color: rgb(33, 166, 3);
                }

                &.color-red {
                    color: rgb(231, 1, 14);
                }
            }

            .text {
                padding-bottom: 10px;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
            }
        }

        .line {
            margin-top: 15px;
            height: 40px;
            width: 1px;
            background-color: #ddd;
        }
    }

    .left-nav {
        padding: 5px;

        .nav-item {
            padding: 5px 0;
            font-weight: 500;

            &:hover {
                cursor: pointer;
                opacity: .8;
            }

            .iconfont {
                font-size: 16px;
                line-height: 20px;
            }

            .name {
                margin-left: 5px;
                font-size: 16px;
                line-height: 20px;
            }
        }
    }

    .color-green {
        color: rgb(83, 213, 42);
    }

    .color-orange {
        color: rgb(245, 174, 7);
    }

    .color-grey {
        color: rgb(205, 203, 203);
    }

    .color-light {
        color: rgb(240, 240, 240);
    }

    .color-red {
        color: rgb(231, 1, 14);
    }

    .color-blue{
        color: rgb(18, 141, 255);
    }

    /*==================*/
    /deep/ .chart-dialog{
        margin-top: 80px !important;
        margin-bottom: 0;
        width: 100%;

        .el-dialog__header{
            .el-dialog__title{
                font-size: 24px;
                font-weight: bolder;
            }
        }

        .el-dialog__body{
            height: calc(100vh - 80px - 55px);

            .chart-wrap{
                height: 100%;
            }
        }
    }

</style>
