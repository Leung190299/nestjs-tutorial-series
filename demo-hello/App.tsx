import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [taps, setTaps] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.flag}>🇻🇳</Text>
      <Text style={styles.title}>ViệtSuper</Text>
      <Text style={styles.subtitle}>Siêu ứng dụng đầu tiên của mình</Text>
      <Pressable style={styles.button} onPress={() => setTaps((t) => t + 1)}>
        <Text style={styles.buttonText}>Đã chạm {taps} lần 👋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  flag: {
    fontSize: 64,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#ea2845',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
