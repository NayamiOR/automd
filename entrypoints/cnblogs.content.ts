import TurndownService from "turndown";

export default defineContentScript({
    matches: ['https://www.cnblogs.com/*'],
    main: () => {
        // 获取文档的高度
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        // 滚动到文档的最底部
        window.scrollTo(0, docHeight);
        window.scrollTo(0, 0);
        let title = document.querySelector(".postTitle")?.outerHTML;
        let titleText = document.title;
        let content = document.querySelector(".blogpost-body")?.outerHTML;

        var turndownService = new TurndownService()
        var markdown = turndownService.turndown(`${title}\n${content}`);
        return {'title': titleText, 'content': markdown};
    }
});