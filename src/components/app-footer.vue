<template>
    <footer class="app-footer">
        <!-- 联系我们 -->
        <div class="contact">
            <div class="container">
                <dl>
                    <dt>客户服务</dt>
                    <dd><i class="iconfont icon-kefu"></i>在线客服</dd>
                    <dd><i class="iconfont icon-question"></i>问题反馈</dd>
                </dl>
                <dl>
                    <dt>关于我们</dt>
                    <dd><i class="iconfont icon-weixin"></i>公众号</dd>
                    <dd><i class="iconfont icon-weibo"></i>微博</dd>
                </dl>
                <dl>
                    <dt>下载APP</dt>
                    <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" alt=""></dd>
                    <dd class="download">
                        <span>扫描二维码</span>
                        <span>立即下载APP</span>
                        <a href="#">下载页面</a>
                    </dd>
                </dl>
                <dl>
                    <dt>服务热线</dt>
                    <dd class="hotline">400-0000-000<small>周一至周日 8:00-18:00</small> </dd>
                </dl>
            </div>
        </div>
        <!-- 其他 -->
        <div class="extra">
            <div class="container">
                <div class="slogan">
                    <a href="javascript:;">
                        <i class="iconfont icon-footer01"></i>
                        <span>价格亲民</span>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-footer01"></i>
                        <span>物流快捷</span>
                    </a>
                    <a href="javascript:;">
                        <i class="iconfont icon-footer01"></i>
                        <span>品质新鲜</span>
                    </a>
                </div>
                <!-- 版权信息 -->
                <div class="copyright">
                    <p>
                        <a href="javascript:;">关于我们</a>
                        <a href="javascript:;">帮助中心</a>
                        <a href="javascript:;">售后服务</a>
                        <a href="javascript:;">配送与验收</a>
                        <a href="javascript:;">商务合作</a>
                        <a href="javascript:;">搜索推荐</a>
                        <a href="javascript:;">友情链接</a>
                    </p>
                    <p>CopyRight © 小兔鲜儿</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>

</script>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.app-footer {
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;
    .contact {
        background-color: #fff;
        .container {
            display: flex;
            padding: 60px 0 40px 25px;
            dl {
                height: 190px;
                text-align: center;
                padding: 0 72px;
                border-right: 1px solid #f2f2f2;
                color: #999;
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    padding-right: 0;
                    border-right: none;
                }
                dt {
                    line-height: 1;
                    font-size: 18px;
                }
                dd {
                    margin: 36px 8px 0 0;
                    float: left;
                    width: 92px;
                    height: 92px;
                    border: 1px solid #ededed;
                    padding-top: 10px;

                    .iconfont {
                        display: block;
                        font-size: 36px;
                        color: #666;
                    }
                    &:hover {
                        .iconfont {
                            color: @xtxColor;
                        }
                    }
                }
                .qrcode {
                    width: 92px;
                    height: 92px;
                    padding: 7px;
                    border: 1px solid #efefef;
                }
                .download {
                    padding-top: 5px;
                    font-size: 14px;
                    width: auto;
                    height: auto;
                    border: none;
                    span {
                        display: block;
                    }
                    a {
                        display: block;
                        line-height: 1;
                        padding: 10px 25px;
                        margin-top: 5px;
                        color: #fff;
                        background-color: @xtxColor;
                        border-radius: 2px;
                    }
                }
                .hotline {
                    border: none;
                    padding-top: 20px;
                    font-size: 22px;
                    color: #666;
                    width: 155px;
                    height: auto;
                    small {
                        display: block;
                        font-size: 15px;
                        color: #999;
                    }
                }
            }
        }
    }
    .extra {
        background-color: #333;
        .slogan {
            height: 178px;
            line-height: 58px;
            padding: 60px 100px;
            border-bottom: 1px solid #434343;
            display: flex;
            justify-content: space-between;
            a {
                height: 50px;
                line-height: 58px;
                font-size: 28px;
                color: #fff;
                .iconfont {
                    font-size: 50px;
                    margin-right: 10px;
                    font-weight: 100;
                    vertical-align: middle;
                }
            }
        }
        .copyright {
            height: 170px;
            text-align: center;
            color: #999;
            padding-top: 40px;
            font-size: 15px;
            p {
                line-height: 1;
                margin-bottom: 20px;
                a {
                    line-height: 1;
                    color: #999;
                    padding:0 10px;
                    border-right: 1px solid #999;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }
}
</style>