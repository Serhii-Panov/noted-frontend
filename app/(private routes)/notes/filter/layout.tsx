// app/notes/filter/layout.tsx

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section style={{ display: "flex", gap: "20px" }}>
      <aside>{sidebar}</aside>
      <div style={{width: "100%"}}>{children}</div>
    </section>
  );
};

export default NotesLayout;
