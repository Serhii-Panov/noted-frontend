
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className="flex justify-between items-start w-full px-8 h-full">
      <aside>{sidebar}</aside>
      <div className="w-full">{children}</div>
    </section>
  );
};

export default NotesLayout;
