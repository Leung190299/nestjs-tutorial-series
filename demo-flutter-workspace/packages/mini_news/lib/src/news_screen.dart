import 'package:flutter/material.dart';

class Article {
  const Article({
    required this.id,
    required this.title,
    required this.emoji,
    required this.summary,
  });

  final String id;
  final String title;
  final String emoji;
  final String summary;
}

const articles = [
  Article(
    id: 'workspace',
    title: 'Flutter có pub workspace chính chủ',
    emoji: '🧱',
    summary:
        'Từ Dart 3.5, cả khu chung cư dùng chung một lần pub get — hết cảnh mỗi package một kiểu version.',
  ),
  Article(
    id: 'mini-app',
    title: 'Mini-app: mỗi tính năng một căn hộ',
    emoji: '🚪',
    summary:
        'Các super-app lớn tách tính năng thành module riêng để hàng chục team làm việc không giẫm chân nhau.',
  ),
  Article(
    id: 'dat-xe',
    title: 'ViệtSuper sắp mở dịch vụ Đặt xe',
    emoji: '🛵',
    summary:
        'Sau Tin tức và Nạp thẻ, ViệtSuper sẽ trình làng dịch vụ thứ ba — vẫn hoàn toàn bằng Flutter.',
  ),
];

class NewsScreen extends StatefulWidget {
  const NewsScreen({super.key});

  @override
  State<NewsScreen> createState() => _NewsScreenState();
}

class _NewsScreenState extends State<NewsScreen> {
  final Set<String> _read = {};

  Future<void> _open(Article article) async {
    await showModalBottomSheet<void>(
      context: context,
      builder: (_) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${article.emoji}  ${article.title}',
                style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 12),
            Text(article.summary, style: Theme.of(context).textTheme.bodyLarge),
          ],
        ),
      ),
    );
    setState(() => _read.add(article.id));
  }

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: articles.length,
      separatorBuilder: (_, _) => const SizedBox(height: 12),
      itemBuilder: (context, index) {
        final article = articles[index];
        final read = _read.contains(article.id);
        return Card(
          child: ListTile(
            leading: Text(article.emoji, style: const TextStyle(fontSize: 32)),
            title: Text(article.title),
            subtitle: read ? const Text('Đã đọc ✓') : null,
            onTap: () => _open(article),
          ),
        );
      },
    );
  }
}
