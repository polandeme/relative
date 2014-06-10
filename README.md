关联词库搜索模型
-----------------------------------
    该模型是基于百度的推荐关键词做的网页爬虫。
    百度根据每次查询的关键词会推荐10个相关的关键词，爬虫的思想是：
    先用指定关键词搜索（如：Iphone5s）搜索，然后返回结果做为搜索词再次搜索，
    迭代层次视情况而定，最后得出一个相关并集，就是该关键词的关联词库。

### 首先安装依赖库：
    npm install jsdom
    //用于解析网页
    npm install iconv-lite
    //将GBK类型网页转UTF-8
    npm install bufferhelper
    [buffer的辅助模块，具体解释点击链接](https://github.com/JacksonTian/bufferhelper) 
    npm install underscore
    //实用的JavaScript工具库
    npm install when
    // Promises/A 规范的实现框架

### 启动程序：
