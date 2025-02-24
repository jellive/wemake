export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">환영합니다!</h1>
      <section className="grid gap-6">
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">시작하기</h2>
          <p className="text-gray-600">
            WeMake와 함께 새로운 프로젝트를 시작해보세요.
          </p>
        </div>
      </section>
    </main>
  )
}
