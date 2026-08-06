
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className="flex gap-5 justify-between items-start w-full px-8 h-[80vh]">
      <aside>{sidebar}</aside>
      <div className="w-full">{children}</div>
    </section>
  );
};

export default NotesLayout;
