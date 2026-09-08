import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const QUESTIONS = [
  { href: '/n1', label: 'N1 · ScrollView vs FlatList 5000 item' },
  { href: '/n2', label: 'N2 · getItemLayout + scrollToIndex' },
  { href: '/n3', label: 'N3 · React.memo cho renderItem' },
  { href: '/n4', label: 'N4 · onEndReached pagination + guard' },
  { href: '/n5', label: 'N5 · Ảnh trong list — expo-image' },
  { href: '/n6', label: 'N6 · Parse data lớn chặn JS thread' },
] as const;

export default function Home() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>RN Perf QA</Text>
      <Text style={styles.sub}>6 câu hỏi phỏng vấn hiệu năng React Native</Text>
      {QUESTIONS.map((q) => (
        <Link key={q.href} href={q.href} asChild>
          <Pressable style={styles.button}>
            <View style={styles.dot} />
            <Text style={styles.buttonText}>{q.label}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 16, gap: 12 },
  heading: { fontSize: 28, fontWeight: '700', color: '#0f172a' },
  sub: { fontSize: 14, color: '#64748b', marginBottom: 8 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3b82f6' },
  buttonText: { fontSize: 15, fontWeight: '600', color: '#0f172a', flexShrink: 1 },
});
