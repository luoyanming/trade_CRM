<template>
    <section class="flex-a-i flex-v">
        <!-- content -->
        <section class="flex-a-i flex-h">
            <!-- left aside -->
            <aside class="left-side">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <div class="label">策略列表</div>
                    </div>
                    <div class="left-nav">
                        <div class="section-loading" v-if="strategy.loading">
                            <i class="el-icon-loading"></i>
                        </div>
                        <div class="nav-item" v-for="(item, index) in strategy.list" :key="item.strategyID">
                            <i class="iconfont icon-zizuan color-grey"></i>
                            <span class="name">{{ item.strategyID }}</span>
                        </div>
                    </div>
                </el-card>
            </aside>
            <!-- right aside -->
            <main class="right-side flex-a-i flex-v">
                <!-- 测试结果 -->
                <section class="section-block">
                    <el-card class="box-card" shadow="never">
                        <div slot="header" class="clearfix">
                            <div class="label">测试结果</div>
                            <div class="btn-wrap">
                                <i class="iconfont icon-duoxuankuang">
                                    <i class="iconfont icon-xuanzhong"></i>
                                </i>
                                <i class="iconfont icon-duoxuankuang"></i>
                                <i class="line">&nbsp;</i>
                                <i class="iconfont icon-cha"></i>
                            </div>
                        </div>
                        <div class="left-nav">
                            <el-table :data="testing.tableData" style="width: 100%;" height="calc(100vh - 210px)" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="testing.tableLoading">
                                <el-table-column type="selection" width="25"></el-table-column>
                                <el-table-column label="" width="30" style="padding: 0;">
                                    <template slot-scope="scope">
                                        <i class="iconfont icon-tubiaozhizuo- color-red" v-if="scope.row.redpoint"></i>
                                    </template>
                                </el-table-column>
                                <el-table-column label="策略名称">
                                    <template slot-scope="scope">{{ scope.row.strategyID }}</template>
                                </el-table-column>
                                <el-table-column label="创建时间">
                                    <template slot-scope="scope">{{ scope.row.dateCreated }}</template>
                                </el-table-column>
                                <el-table-column label="测试周期">
                                    <template slot-scope="scope">{{ scope.row.dateRange }}</template>
                                </el-table-column>
                                <el-table-column label="合约">
                                    <template slot-scope="scope">{{ scope.row.symbols }}</template>
                                </el-table-column>
                                <el-table-column label="交易次数">
                                    <template slot-scope="scope">{{ scope.row.tradeCount }}</template>
                                </el-table-column>
                                <el-table-column label="净利润">
                                    <template slot-scope="scope">{{ scope.row.netProfit }}</template>
                                </el-table-column>
                                <el-table-column label="收益率">
                                    <!-- <template slot-scope="scope">{{ scope.row. }}</template> -->
                                </el-table-column>
                                <el-table-column label="最大回撤">
                                    <template slot-scope="scope">{{ scope.row.maxDropdownRatio }}</template>
                                </el-table-column>
                                <el-table-column label="收益/⻛险">
                                    <template slot-scope="scope">{{ scope.row.profitMaxDropdown }}</template>
                                </el-table-column>
                                <el-table-column label="">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="handleShowDetailModal(scope.row)">查看详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination background @current-change="handleCurrentChange" :current-page="testing.page.current" :page-size="testing.page.size" layout="total, prev, pager, next" :total="testing.page.total">
                            </el-pagination>
                        </div>
                    </el-card>
                </section>
            </main>
        </section>
        <el-dialog :title="testing.dialogInfo.id" :visible.sync="testing.dialogInfo.visible" custom-class="chart-dialog">
            <el-tabs v-model="testing.dialogInfo.tabs.activeName" @tab-click="handleDialogTabsClick">
                <el-tab-pane label="指标概要" name="indexSummary">
                    <table class="index-summary-table" cellpadding="0" cellspacing="0" v-loading="testing.dialogInfo.tabs.indexSummary.loading">
                        <tr>
                            <th>序号</th>
                            <th>指标名称</th>
                            <th>指标值</th>
                            <th>指标名称</th>
                            <th>指标值</th>
                            <th>指标名称</th>
                            <th>指标值</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>净利润</td>
                            <td>{{ testing.dialogInfo.tabs.indexSummary.detail.netProfit }}</td>
                            <td>最大亏损</td>
                            <td>-6,844.70</td>
                            <td>总交易时间</td>
                            <td>645天</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>总盈利</td>
                            <td>479,723.15</td>
                            <td>平均亏损</td>
                            <td>-4,967.91</td>
                            <td>初始权益</td>
                            <td>1,000,000.00</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>总亏损</td>
                            <td>-268,267.38</td>
                            <td>净利润/最大升水(%)</td>
                            <td>430.82</td>
                            <td>最小权益</td>
                            <td>975,978.17</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>总盈利/总亏损(%)</td>
                            <td>178.82</td>
                            <td>净利润/最大盈利(%)</td>
                            <td>1148.3</td>
                            <td>最大权益</td>
                            <td>1,215,379.68</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>毛利润</td>
                            <td>219,180.00</td>
                            <td>净利润/最大回撤(%)</td>
                            <td>639.27</td>
                            <td>平均回撤</td>
                            <td>8,650.09</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>平均利润</td>
                            <td>1,289.13</td>
                            <td>净利润/最大亏损(%)</td>
                            <td>3089.34</td>
                            <td>最大使用资金</td>
                            <td>131,892.00</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>总交易手续费</td>
                            <td>7,724.23</td>
                            <td>最大盈利/最大亏损(%)</td>
                            <td>269.04</td>
                            <td>结束总权益</td>
                            <td>1,211,455.77</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>手续费/毛利润(%)</td>
                            <td>3.52</td>
                            <td>平均盈利/平均亏损(%)</td>
                            <td>109.73</td>
                            <td>胜率(%)</td>
                            <td>61.97</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>未成交手数</td>
                            <td>0</td>
                            <td>最大盈利/总盈利</td>
                            <td>3.84</td>
                            <td>收益率(%)</td>
                            <td>21.15</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>盈利次数</td>
                            <td>88</td>
                            <td>最大亏损/总亏损(%)</td>
                            <td>2.55</td>
                            <td>有效收益率(%)</td>
                            <td>160.32</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>亏损次数</td>
                            <td>54</td>
                            <td>最大回撤</td>
                            <td>33,077.48</td>
                            <td>年度收益率(%)</td>
                            <td>90.73</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>持平次数</td>
                            <td>0</td>
                            <td>最大回撤比(%)</td>
                            <td>2.7298</td>
                            <td>月度平均盈利</td>
                            <td>9,999.07</td>
                        </tr>
                        <tr>
                            <td>13</td>
                            <td>盈利次数/总交易次数(%)</td>
                            <td>61.97</td>
                            <td>最大回撤时间</td>
                            <td>2019/06/10 13:42:17.200</td>
                            <td>年化收益</td>
                            <td>119,661.02</td>
                        </tr>
                        <tr>
                            <td>14</td>
                            <td>亏损次数/盈利次数(%)</td>
                            <td>61.36</td>
                            <td>最大回撤持续期</td>
                            <td>12天</td>
                            <td>收益风险比</td>
                            <td>3.6176</td>
                        </tr>
                        <tr>
                            <td>15</td>
                            <td>亏损次数/总交易次数(%)</td>
                            <td>38.03</td>
                            <td>最大升水</td>
                            <td>49,082.72</td>
                            <td>调整收益风险比</td>
                            <td>13.8335</td>
                        </tr>
                        <tr>
                            <td>16</td>
                            <td>最大连续盈利次数</td>
                            <td>11</td>
                            <td>最大升水比(%)</td>
                            <td>4.824</td>
                            <td>年化夏普比率</td>
                            <td>-0.000020</td>
                        </tr>
                        <tr>
                            <td>17</td>
                            <td>最大连续亏损次数</td>
                            <td>5</td>
                            <td>最大升水时间</td>
                            <td>2018/08/17 14:50:01.700</td>
                            <td>置信度</td>
                            <td>0.92</td>
                        </tr>
                        <tr>
                            <td>18</td>
                            <td>总交易次数</td>
                            <td>142</td>
                            <td>最大持仓</td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>19</td>
                            <td>总交易委托数</td>
                            <td>284</td>
                            <td>总持仓时间</td>
                            <td>44天3小时33分47秒</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>20</td>
                            <td>最大盈利</td>
                            <td>18,414.67</td>
                            <td>平均持仓时间</td>
                            <td>1小时15分52秒</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>21</td>
                            <td>平均盈利</td>
                            <td>5,451.40</td>
                            <td>持仓时间比率(%)</td>
                            <td>6.96</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>22</td>
                            <td>策略开始时间</td>
                            <td>2017/01/03 09:29:00</td>
                            <td>策略停止时间</td>
                            <td>2019/08/23 15:00:00</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="图表概要" name="chartSummary">
                    <el-tabs v-model="chartTabs.activeName" tab-position="left" style="height: 100%;" @tab-click="handleChartSummaryTabsClick">
                        <el-tab-pane label="盈亏变化" name="chartProfit">
                            <div class="chart-wrap" id="chart-profit" v-loading="chartTabs.chartProfit.loading"></div>
                        </el-tab-pane>
                        <el-tab-pane label="资金变化" name="chartCaptial">
                            <div class="chart-wrap" id="chart-captial" v-loading="chartTabs.chartCaptial.loading"></div>
                        </el-tab-pane>
                        <el-tab-pane label="日报" name="chartDay">
                            <div class="chart-wrap" id="chart-day" v-loading="chartTabs.chartDay.loading"></div>
                        </el-tab-pane>
                        <el-tab-pane label="周报" name="chartWeek">
                            <div class="chart-wrap" id="chart-week" v-loading="chartTabs.chartWeek.loading"></div>
                        </el-tab-pane>
                        <el-tab-pane label="月报" name="chartMonth">
                            <div class="chart-wrap" id="chart-month" v-loading="chartTabs.chartMonth.loading"></div>
                        </el-tab-pane>
                        <el-tab-pane label="年报" name="chartYear">
                            <div class="chart-wrap" id="chart-year" v-loading="chartTabs.chartYear.loading"></div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="策略信息" name="strategyInfo">
                    <table class="index-strategyInfo-table" cellpadding="0" cellspacing="0" v-loading="testing.dialogInfo.tabs.strategyInfo.loading">
                        <tr>
                            <th>序号</th>
                            <th>参数名称</th>
                            <th>参数值</th>
                        </tr>
                        <tr v-for="(item, index) in testing.dialogInfo.tabs.strategyInfo.detail" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.value }}</td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="委托明细" name="delegateDetail">
                    <div style="text-align: right;">
                        <el-button type="primary" size="small">导出为EXCEL</el-button>
                    </div>

                    <el-table :data="testing.dialogInfo.tabs.delegateDetail.tableData" style="width: 100%;" height="calc(100vh - 210px)" v-loading="testing.dialogInfo.tabs.delegateDetail.loading">
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
                <el-tab-pane label="成交明细" name="bargainDetail">
                    <div style="text-align: right;">
                        <el-button type="primary" size="small">导出为EXCEL</el-button>
                    </div>
                    
                    <el-table :data="testing.dialogInfo.tabs.bargainDetail.tableData" style="width: 100%;" height="calc(100vh - 210px)" v-loading="testing.dialogInfo.tabs.bargainDetail.loading">
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
        </el-dialog>
    </section>
</template>
<script>
    import { API, SOCKET } from '@/common/api';

    export default {
        name: '',
        data() {
            return {
                token: localStorage.getItem('token'),

                // 策略列表
                strategy: {
                    loading: true,
                    list: []
                },

                // 测试结果
                testing: {
                    tableLoading: false,
                    tableData: [],
                    page: {
                        current: 1,
                        size: 10,
                        total: 0
                    },

                    dialogInfo: { // 详情弹窗
                        visible: false,
                        id: '',
                        tabs: {
                            activeName: 'indexSummary',

                            indexSummary: { // 指标概要
                                loading: true,
                                detail: {

                                }
                            },

                            chartSummary: { // 图表概要
                                
                            },

                            strategyInfo: { // 策略信息
                                loading: true,
                                detail: {}
                            },

                            delegateDetail: { // 委托明细
                                loading: true,
                                tableData: []
                            },

                            bargainDetail: { // 成交明细
                                loading: true,
                                tableData: []
                            }
                        }
                    }
                },

                chartTabs: {
                    activeName: 'chartProfit',

                    chartProfit: { // 盈亏变化
                        loading: true,
                        chart: null,
                        option: {}
                    },

                    chartCaptial: { // 资金变化
                        loading: true,
                        chart: null,
                        option: {}
                    },

                    chartDay: { // 日报
                        loading: true,
                        chart: null,
                        option: {}
                    },

                    chartWeek: { // 周报
                        loading: true,
                        chart: null,
                        option: {}
                    },

                    chartMonth: { // 月报
                        loading: true,
                        chart: null,
                        option: {}
                    },

                    chartYear: { // 年报
                        loading: true,
                        chart: null,
                        option: {}
                    }
                }                
            }
        },
        methods: {
            /**
             * [pageInit description] 页面初始化
             * @return {[type]} [description]
             */
            pageInit() {
                this.getStrategyList();

                this.getTestingList();
            },
            /**
             * [getStrategyList description] 获取策略列表
             * @return {[type]} [description]
             */
            getStrategyList() {
                var params = {
                    method: 'backtesting_results',
                    token: this.token
                };

                this.strategy.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.strategy.loading = false;
                        this.strategy.list = data;
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getTestingList description] 获取测试结果列表
             * @return {[type]} [description]
             */
            getTestingList() {
                var params = {
                    method: 'backtesting_strategies',
                    page: this.testing.page.current,
                    itemsPerPage: this.testing.page.size,
                    token: this.token
                };

                this.testing.tableLoading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.testing.tableLoading = false;
                        this.testing.tableData = data;
                        console.log(res, res.itemsTotal)
                        this.testing.page.total = res.itemsTotal;
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [handleCurrentChange description] 选择分页第几页
             * @param  {[type]} val [description]
             * @return {[type]}     [description]
             */
            handleCurrentChange(val) {
                this.testing.page.current = val;
            },
            /**
             * [handleSelectionChange description] 测试结果 - 表格 - 选中效果变化
             * @param  {[type]} val [description] 选中的列的集合 [array]
             * @return {[type]}     [description]
             */
            handleSelectionChange(val) {

            },
            /**
             * [handleShowDetailModal description] 测试结果 - 表格 - 查看详情
             * @param  {[type]} row [description] 查看那一列的数据
             * @return {[type]}     [description]
             */
            handleShowDetailModal(row) {
                this.testing.dialogInfo.id = row.strategyID;
                this.testing.dialogInfo.visible = true;

                setTimeout(() => {
                    this.testing.dialogInfo.activeName = 'indexSummary';

                    this.getIndexSummary();
                }, 1)
            },
            /**
             * [handleDialogTabsClick description] 测试结果 - 表格 - 查看详情 - tab切换
             * @param  {[type]} tab   [description]
             * @param  {[type]} event [description]
             * @return {[type]}       [description]
             */
            handleDialogTabsClick(tab, event) {
                switch (tab.name) {
                    case 'indexSummary': // 指标概要
                        this.getIndexSummary();
                        break;
                    case 'chartSummary': // 图表概要
                        this.chartTabs.activeName = 'chartProfit';

                        this.getChartProfit();
                        break;
                    case 'strategyInfo': // 策略信息
                        this.getStrategyInfo();
                        break;
                    case 'delegateDetail': // 委托明细
                        this.getDelegateDetail();
                        break;
                    case 'bargainDetail': // 成交明细
                        this.getBargainDetail();
                        break;
                    default:
                        return false;
                }
            },
            /**
             * [handleChartSummaryTabsClick description] 测试结果 - 表格 - 查看详情 - 图表概要 - tab切换
             * @param  {[type]} tab   [description]
             * @param  {[type]} event [description]
             * @return {[type]}       [description]
             */
            handleChartSummaryTabsClick(tab, event) {
                switch (tab.name) {
                    case 'chartProfit': // 盈亏变化
                        this.getChartProfit();
                        break;
                    case 'chartCaptial': // 资金变化
                        this.getChartCaptial();
                        break;
                    case 'chartDay': // 日报
                        this.getChartDay();
                        break;
                    case 'chartWeek': // 周报
                        this.getChartWeek();
                        break;
                    case 'chartMonth': // 月报
                        this.getChartMonth();
                        break;
                    case 'chartYear': // 年报
                        this.getChartYear();
                        break;
                    default:
                        return false;
                }
            },
            /**
             * [getIndexSummary description] 测试结果 - 表格 - 查看详情 - 指标概要
             * @return {[type]} [description]
             */
            getIndexSummary() {
                this.testing.dialogInfo.tabs.indexSummary.detail = {};

                var params = {
                    method: 'backtesting_summary',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.testing.dialogInfo.tabs.indexSummary.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg } = res;

                    if(error_code == 0){
                        this.testing.dialogInfo.tabs.indexSummary.loading = false;
                        this.testing.dialogInfo.tabs.indexSummary.detail = res;
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getChartProfit description] 测试结果 - 表格 - 查看详情 - 图表概要 - 获取盈亏变化
             * @return {[type]} [description]
             */
            getChartProfit() {
                this.chartTabs.chartProfit.chart = null;
                this.chartTabs.chartProfit.option = {};

                var params = {
                    method: 'backtesting_close_report',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.chartTabs.chartProfit.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.chartTabs.chartProfit.loading = false;

                        let xData = [],
                            x2Data = [],
                            yData = [];

                        if(data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                xData.push(data[i].date);
                                x2Data.push(data[i].tradeNo);
                                yData.push(data[i].totalProfit);
                            }
                        }

                        let option = {
                            grid: {
                                show: true,
                                bottom: 100
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    let temp = '',
                                        dataItem = data[params[0].dataIndex];
                                    
                                    temp += '<div><p>时间：'+ params[0].name +'</p></div>';
                                    temp += '<div><p>平仓次数：'+ dataItem.tradeNo +'</p></div>';
                                    temp += '<div><p>盈亏：'+ dataItem.profit +'</p></div>';
                                    temp += '</div><div><p>总盈亏：'+ dataItem.totalProfit +'</p></div>';

                                    return temp;
                                }
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '时间',
                                    nameLocation: 'middle',
                                    nameGap: 30,
                                    data: xData
                                },
                                {
                                    type: 'category',
                                    name: '平仓次数',
                                    nameLocation: 'middle',
                                    nameGap: 30,
                                    data: x2Data
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '盈亏',
                                    nameLocation: 'middle',
                                    nameGap: 80,
                                    min: 'dataMin'
                                }
                            ],
                            series: [{
                                type: 'line',
                                data: yData
                            }]
                        }
                        this.chartTabs.chartProfit.option = option;

                        this.chartTabs.chartProfit.chart = this.$echarts.init(document.getElementById('chart-profit'));
                        this.chartTabs.chartProfit.chart.setOption(this.chartTabs.chartProfit.option);
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getChartCaptial description] 测试结果 - 表格 - 查看详情 - 图表概要 - 获取资金变化
             * @return {[type]} [description]
             */
            getChartCaptial() {
                this.chartTabs.chartCaptial.chart = null;
                this.chartTabs.chartCaptial.option = {};

                var params = {
                    method: 'backtesting_clear_report',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.chartTabs.chartCaptial.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.chartTabs.chartCaptial.loading = false;

                        let xData = [],
                            yData = [];

                        if(data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                xData.push(data[i].date);
                                yData.push(data[i].totalProfit);
                            }
                        }

                        let option = {
                            grid: {
                                show: true,
                                bottom: 100
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    let temp = '',
                                        dataItem = data[params[0].dataIndex];
                                    
                                    temp += '<div><p>时间：'+ params[0].name +'</p></div>';
                                    temp += '<div><p>盈亏：'+ dataItem.profit +'</p></div>';
                                    temp += '</div><div><p>总盈亏：'+ dataItem.totalProfit +'</p></div>';

                                    return temp;
                                }
                            },
                            xAxis: {
                                type: 'category',
                                name: '时间',
                                nameLocation: 'middle',
                                nameGap: 30,
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                name: '盈亏',
                                nameLocation: 'middle',
                                nameGap: 80,
                                // min: 'dataMin'
                            },
                            series: [{
                                type: 'line',
                                data: yData
                            }]
                        }
                        this.chartTabs.chartCaptial.option = option;

                        this.chartTabs.chartCaptial.chart = this.$echarts.init(document.getElementById('chart-captial'));
                        this.chartTabs.chartCaptial.chart.setOption(this.chartTabs.chartCaptial.option);
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getChartDay description] 测试结果 - 表格 - 查看详情 - 图表概要 - 日报
             * @return {[type]} [description]
             */
            getChartDay() {
                this.chartTabs.chartDay.chart = null;
                this.chartTabs.chartDay.option = {};

                var params = {
                    method: 'backtesting_daily_profit',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.chartTabs.chartDay.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.chartTabs.chartDay.loading = false;

                        let xData = [],
                            yData = [];

                        if(data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                xData.push(data[i].date);
                                if(data[i].profit < 0) {
                                    yData.push({
                                        value: data[i].profit,
                                        itemStyle: {
                                            color: 'green'
                                        }
                                    });
                                } else {
                                    yData.push(data[i].profit);
                                }
                            }
                        }

                        let option = {
                            grid: {
                                show: false,
                                bottom: 100
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    let temp = '',
                                        dataItem = data[params[0].dataIndex];
                                    
                                    temp += '<div><p>时间：'+ params[0].name +'</p></div>';
                                    temp += '<div><p>盈亏：'+ dataItem.profit +'</p></div>';

                                    return temp;
                                }
                            },
                            xAxis: {
                                show: false,
                                type: 'category',
                                name: '时间',
                                nameLocation: 'middle',
                                nameGap: 30,
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                name: '盈亏',
                                nameLocation: 'middle',
                                nameGap: 80,
                                splitLine: {lineStyle:{type:'dashed'}},
                            },
                            series: [{
                                type: 'bar',
                                data: yData
                            }]
                        }
                        this.chartTabs.chartDay.option = option;

                        this.chartTabs.chartDay.chart = this.$echarts.init(document.getElementById('chart-day'));
                        this.chartTabs.chartDay.chart.setOption(this.chartTabs.chartDay.option);
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getChartWeek description] 测试结果 - 表格 - 查看详情 - 图表概要 - 周报
             * @return {[type]} [description]
             */
            getChartWeek() {
                this.chartTabs.chartWeek.chart = null;
                this.chartTabs.chartWeek.option = {};

                var params = {
                    method: 'backtesting_weekly_profit',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.chartTabs.chartWeek.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.chartTabs.chartWeek.loading = false;

                        let xData = [],
                            yData = [];

                        if(data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                xData.push(data[i].date);
                                if(data[i].profit < 0) {
                                    yData.push({
                                        value: data[i].profit,
                                        itemStyle: {
                                            color: 'green'
                                        }
                                    });
                                } else {
                                    yData.push(data[i].profit);
                                }
                            }
                        }

                        let option = {
                            grid: {
                                show: false,
                                bottom: 100
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    let temp = '',
                                        dataItem = data[params[0].dataIndex];
                                    
                                    temp += '<div><p>时间：'+ params[0].name +'</p></div>';
                                    temp += '<div><p>盈亏：'+ dataItem.profit +'</p></div>';

                                    return temp;
                                }
                            },
                            xAxis: {
                                show: false,
                                type: 'category',
                                name: '时间',
                                nameLocation: 'middle',
                                nameGap: 30,
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                name: '盈亏',
                                nameLocation: 'middle',
                                nameGap: 80,
                                splitLine: {lineStyle:{type:'dashed'}},
                            },
                            series: [{
                                type: 'bar',
                                data: yData
                            }]
                        }
                        this.chartTabs.chartWeek.option = option;

                        this.chartTabs.chartWeek.chart = this.$echarts.init(document.getElementById('chart-week'));
                        this.chartTabs.chartWeek.chart.setOption(this.chartTabs.chartWeek.option);
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getChartMonth description] 测试结果 - 表格 - 查看详情 - 图表概要 - 月报
             * @return {[type]} [description]
             */
            getChartMonth() {
                this.chartTabs.chartMonth.chart = null;
                this.chartTabs.chartMonth.option = {};

                var params = {
                    method: 'backtesting_monthly_profit',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.chartTabs.chartMonth.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.chartTabs.chartMonth.loading = false;

                        let xData = [],
                            yData = [];

                        if(data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                xData.push(data[i].date);
                                if(data[i].profit < 0) {
                                    yData.push({
                                        value: data[i].profit,
                                        itemStyle: {
                                            color: 'green'
                                        }
                                    });
                                } else {
                                    yData.push(data[i].profit);
                                }
                            }
                        }

                        let option = {
                            grid: {
                                show: false,
                                bottom: 100
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    let temp = '',
                                        dataItem = data[params[0].dataIndex];
                                    
                                    temp += '<div><p>时间：'+ params[0].name +'</p></div>';
                                    temp += '<div><p>盈亏：'+ dataItem.profit +'</p></div>';

                                    return temp;
                                }
                            },
                            xAxis: {
                                show: false,
                                type: 'category',
                                name: '时间',
                                nameLocation: 'middle',
                                nameGap: 30,
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                name: '盈亏',
                                nameLocation: 'middle',
                                nameGap: 80,
                                splitLine: {lineStyle:{type:'dashed'}},
                            },
                            series: [{
                                type: 'bar',
                                data: yData
                            }]
                        }
                        this.chartTabs.chartMonth.option = option;

                        this.chartTabs.chartMonth.chart = this.$echarts.init(document.getElementById('chart-month'));
                        this.chartTabs.chartMonth.chart.setOption(this.chartTabs.chartMonth.option);
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getChartYear description] 测试结果 - 表格 - 查看详情 - 图表概要 - 年报
             * @return {[type]} [description]
             */
            getChartYear() {
                this.chartTabs.chartYear.chart = null;
                this.chartTabs.chartYear.option = {};

                var params = {
                    method: 'backtesting_yearly_profit',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.chartTabs.chartYear.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg, data } = res;

                    if(error_code == 0){
                        this.chartTabs.chartYear.loading = false;

                        let xData = [],
                            yData = [];

                        if(data.length > 0) {
                            for(let i = 0; i < data.length; i++) {
                                xData.push(data[i].date);
                                if(data[i].profit < 0) {
                                    yData.push({
                                        value: data[i].profit,
                                        itemStyle: {
                                            color: 'green'
                                        }
                                    });
                                } else {
                                    yData.push(data[i].profit);
                                }
                            }
                        }

                        let option = {
                            grid: {
                                show: false,
                                bottom: 100
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: function (params) {
                                    let temp = '',
                                        dataItem = data[params[0].dataIndex];
                                    
                                    temp += '<div><p>时间：'+ params[0].name +'</p></div>';
                                    temp += '<div><p>盈亏：'+ dataItem.profit +'</p></div>';

                                    return temp;
                                }
                            },
                            xAxis: {
                                show: false,
                                type: 'category',
                                name: '时间',
                                nameLocation: 'middle',
                                nameGap: 30,
                                data: xData
                            },
                            yAxis: {
                                type: 'value',
                                name: '盈亏',
                                nameLocation: 'middle',
                                nameGap: 80,
                                splitLine: {lineStyle:{type:'dashed'}},
                            },
                            series: [{
                                type: 'bar',
                                data: yData
                            }]
                        }
                        this.chartTabs.chartYear.option = option;

                        this.chartTabs.chartYear.chart = this.$echarts.init(document.getElementById('chart-year'));
                        this.chartTabs.chartYear.chart.setOption(this.chartTabs.chartYear.option);
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getStrategyInfo description] 测试结果 - 表格 - 查看详情 - 指标概要
             * @return {[type]} [description]
             */
            getStrategyInfo() {
                this.testing.dialogInfo.tabs.strategyInfo.detail = {};

                var params = {
                    method: 'backtesting_info',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.testing.dialogInfo.tabs.strategyInfo.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg } = res;

                    if(error_code == 0){
                        this.testing.dialogInfo.tabs.strategyInfo.loading = false;

                        let detail = [
                            {
                                name: '策略名称',
                                value: res.strategyID
                            },
                            {
                                name: '开始时间',
                                value: res.startTime
                            },
                            {
                                name: '结束时间',
                                value: res.stopTime
                            },
                            {
                                name: '合约',
                                value: res.symbols.join('，')
                            }
                        ];
                        for (var prop in res.params) {
                            detail.push({
                                name: prop,
                                value: res.params[prop]
                            })
                        }

                        this.testing.dialogInfo.tabs.strategyInfo.detail = detail;
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getDelegateDetail description] 测试结果 - 表格 - 查看详情 - 委托明细
             * @return {[type]} [description]
             */
            getDelegateDetail() {
                this.testing.dialogInfo.tabs.delegateDetail.tableData = [];

                var params = {
                    method: 'backtesting_orders',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.testing.dialogInfo.tabs.delegateDetail.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg } = res;

                    if(error_code == 0){
                        this.testing.dialogInfo.tabs.delegateDetail.loading = false;
                        this.testing.dialogInfo.tabs.delegateDetail.tableData = res.data;
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    this.$message.error('服务器异常');
                })
            },
            /**
             * [getBargainDetail description] 测试结果 - 表格 - 查看详情 - 成交明细
             * @return {[type]} [description]
             */
            getBargainDetail() {
                this.testing.dialogInfo.tabs.bargainDetail.tableData = [];

                var params = {
                    method: 'backtesting_trades',
                    backtestingID: this.testing.dialogInfo.id,
                    token: this.token
                };

                this.testing.dialogInfo.tabs.bargainDetail.loading = true;

                API(params).then(res => {
                    let { error_code, error_msg } = res;

                    if(error_code == 0){
                        this.testing.dialogInfo.tabs.bargainDetail.loading = false;
                        this.testing.dialogInfo.tabs.bargainDetail.tableData = res.data;
                    }else{
                        this.$message({ message: error_msg, type: "error" });
                    }
                }).catch(error => {
                    this.$message.error('服务器异常');
                })
            },

        },
        mounted() {
            this.pageInit();
        }
    }

</script>
<style lang="scss" scoped>
    @import "../../common/styles/base/mixin-common";

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

    .color-red {
        color: rgb(231, 1, 14);
    }

    .color-blue {
        color: rgb(18, 141, 255);
    }

    /*==================*/
    .el-pagination {
        margin-top: 15px;
        text-align: right;
    }

    /*==================*/
    /deep/ .chart-dialog {
        margin-top: 80px !important;
        margin-bottom: 0;
        width: 100%;

        .el-dialog__header {
            .el-dialog__title {
                font-size: 24px;
                font-weight: bolder;
            }
        }

        .el-dialog__body {
            height: calc(100vh - 80px - 55px);

            .chart-wrap {
                height: 100%;
            }
        }
    }

    .index-summary-table{
        margin-top: 10px;
        width: 100%;

        tr{
            th,
            td{
                padding: 5px;
                font-size: 14px;
                line-height: 1.5;
                border-top: 0;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                border-left: 0;

                &:first-child{
                    border-left: 1px solid #ddd;
                    font-weight: bolder;
                }

                &:nth-of-type(2),
                &:nth-of-type(4),
                &:nth-of-type(6){
                    text-align: center;
                    font-weight: bolder;
                }

                &:nth-of-type(3),
                &:nth-of-type(5),
                &:nth-of-type(7){
                    text-align: right;
                }
            }

            th{
                font-size: 14px;
                font-weight: bolder;
                border-top: 1px solid #ddd;

                &:first-child{
                    text-align: left;
                }
            }
        }
    }

    .index-strategyInfo-table{
        margin-top: 10px;
        width: 500px;

        tr{
            th,
            td{
                padding: 5px;
                font-size: 14px;
                line-height: 1.5;
                border-top: 0;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                border-left: 0;

                &:first-child{
                    border-left: 1px solid #ddd;
                    font-weight: bolder;
                }

                &:nth-of-type(1){
                    width: 50px;
                    text-align: left;
                    font-weight: bolder;
                }

                &:nth-of-type(2){
                    width: 150px;
                    text-align: left;
                    font-weight: bolder;
                }

                &:nth-of-type(3){
                    text-align: center;
                }
            }

            th{
                font-size: 14px;
                font-weight: bolder;
                border-top: 1px solid #ddd;

                &:first-child{
                    text-align: left;
                }
            }
        }
    }

    .el-tab-pane{
        height: calc(100vh - 80px - 115px);
        margin-top: 10px;
    }

    .chart-wrap{
        padding: 0 0 20px 0;
        height: 100%;
    }
</style>
