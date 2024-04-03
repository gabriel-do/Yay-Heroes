import { useQuery } from "@tanstack/react-query";
import { getHeroes } from "../../services/heroesService";
import { Button, Flex } from 'antd';
import './heroes.css';

const Heroes = () => {
  const heroesFromApi = useQuery({
    queryKey: ['heroesDataFromApi'],
    queryFn: async () => await getHeroes(),
    refetchOnWindowFocus: false
  });

  const heroesFromWindow = useQuery({
    queryKey: ['heroesDataFromWindow'],
    queryFn: () => window.yayHeroes.allHeroes
  });

  console.log(heroesFromWindow?.data);


  if (heroesFromApi?.isLoading) return 'Loading...';
  if (heroesFromApi?.isError) return 'An error has occurred: ' + heroesFromApi?.error?.message;
  return (
    <>
      <h2>Heroes</h2>
      <table className="table-hero">
        <thead>
          <tr className="tr-hero">
            <th className="th-hero">NAME</th>
            <th className="th-hero">CLASS</th>
          </tr>
        </thead>
        <tbody>
          {heroesFromApi?.data?.heroes.map((hero) => {
            return (
              <tr className="tr-hero" key={hero?.id}>
                <td className="td-hero">{hero?.name}</td>
                <td className="td-hero">{hero?.class}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Flex wrap="wrap">
        <Button loading={heroesFromApi?.isFetching} type="primary" onClick={() => heroesFromApi.refetch()}>{`${heroesFromApi.isFetching ? 'Fetching' : 'Refetch'}`}</Button>
      </Flex>
    </>
  );
}

export default Heroes;