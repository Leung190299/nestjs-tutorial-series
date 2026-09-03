import SwiftUI

struct ContentView: View {
  @State private var selected: MiniApp?

  var body: some View {
    NavigationStack {
      ScrollView {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())],
                  spacing: 16) {
          ForEach(miniApps) { app in
            Button { selected = app } label: {
              VStack(spacing: 8) {
                Text(app.emoji).font(.system(size: 44))
                Text(app.name).font(.headline).foregroundStyle(.primary)
              }
              .frame(maxWidth: .infinity)
              .padding(.vertical, 24)
              .background(Color(.secondarySystemBackground))
              .clipShape(RoundedRectangle(cornerRadius: 16))
            }
          }
        }
        .padding()
      }
      .navigationTitle("ViệtSuper 🇻🇳")
    }
    .fullScreenCover(item: $selected) { app in
      MiniAppView(library: app.library) { selected = nil }
        .ignoresSafeArea()
    }
  }
}
