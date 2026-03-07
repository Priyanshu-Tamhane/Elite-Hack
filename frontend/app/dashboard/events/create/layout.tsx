export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-4xl">
      {children}
    </div>
  )
}
