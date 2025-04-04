import { useGetAllTodosQuery } from "@/api/customerApi/exampleApi";

export const Home = () => {
  const { data: todos } = useGetAllTodosQuery();
  return (
    <div className="h-screen bg-primary">
      {todos && todos.map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};
