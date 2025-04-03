import { defineLoader, createContentLoader } from 'vitepress';

export interface ReadingTimeData {
    path: string;
    title: string;
    readingTime: {
        minutes: number;
        seconds: number;
        labelText: string;
    };
}

export interface ReadingTimeResult {
    articles: ReadingTimeData[];
}

declare const data: ReadingTimeResult;
export { data };

// 每分鐘的平均閱讀字數（中文）
const CHARS_PER_MINUTE = 300;

/**
 * 計算文本的閱讀時間
 */
function calculateReadingTime(text: string): {
    minutes: number;
    seconds: number;
    labelText: string;
} {
    // 移除HTML標籤
    const textWithoutHTML = text.replace(/<[^>]*>/g, '');

    // 移除多餘空格、換行符等
    const cleanText = textWithoutHTML.replace(/\s+/g, ' ').trim();

    // 計算字符數（不含空格）
    const charCount = cleanText.replace(/\s/g, '').length;

    // 計算閱讀時間（分鐘和秒）
    const totalSeconds = Math.ceil((charCount / CHARS_PER_MINUTE) * 60);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // 生成可讀的文本
    const labelText = minutes > 0 ? `${minutes} 分 ${seconds} 秒閱讀` : `${seconds} 秒閱讀`;

    return { minutes, seconds, labelText };
}

export default defineLoader({
    async load(): Promise<ReadingTimeResult> {
        // 使用createContentLoader加載所有Markdown文件
        const articles = await createContentLoader('**/*.md', {
            includeSrc: true, // 需要原始Markdown內容來計算閱讀時間
            transform(data) {
                return data.map((page) => {
                    // 計算閱讀時間
                    const readingTime = calculateReadingTime(page.src || '');

                    return {
                        path: page.url,
                        title: page.frontmatter.title || '',
                        readingTime,
                    };
                });
            },
        }).load();

        return { articles };
    },
});
