import { useGetAllTodosQuery } from "@/api/customerApi/exampleApi";

export const Home = () => {
  const { data: todos } = useGetAllTodosQuery();
  return (
    <div className="h-screen ">
      {todos && todos.slice(0,6).map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};
