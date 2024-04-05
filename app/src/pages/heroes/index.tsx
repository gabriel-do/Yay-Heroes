import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHeroes } from "../../services/heroesService";
import { HeroModel } from "../../interfaces/IHero";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Table } from "antd";
const { Column } = Table;

interface DataSource {
  key: number;
  name: string;
  class: string;
}

const Heroes = () => {
  const [canRead] = useState(parseInt(window.yayHeroes.canRead));
  const [canWrite] = useState(parseInt(window.yayHeroes.canWrite));
  const navigate = useNavigate();
  const heroesFromApi = useQuery({
    queryKey: ["getHeroes"],
    queryFn: async () => await getHeroes(),
    refetchOnWindowFocus: false,
  });

  // const heroesFromWindow = useQuery({
  //   queryKey: ["heroesDataFromWindow"],
  //   queryFn: () => window.yayHeroes.allHeroes,
  // });

  function mapDataSource(dataArr: HeroModel[]): DataSource[] {
    const dataSource = dataArr.map((item) => ({
      key: item?.id,
      name: item?.name,
      class: item?.class,
    }));
    return dataSource;
  }

  if (canRead) {
    if (heroesFromApi?.isLoading) {
      return (
        <Flex justify="center" wrap="wrap" gap="large">
          <h2>LOADING...</h2>
        </Flex>
      );
    }
    if (heroesFromApi?.isError) {
      return (
        <Flex justify="center" wrap="wrap" gap="large">
          <h2>An error has occurred: + {heroesFromApi?.error?.message}</h2>
        </Flex>
      );
    }
    return (
      <>
        <h2>Heroes</h2>
        <Flex wrap="wrap" gap="large">
          <Button
            loading={heroesFromApi?.isFetching}
            type="primary"
            onClick={() => heroesFromApi.refetch()}
          >{`${heroesFromApi.isFetching ? "Fetching" : "Refetch"}`}</Button>
          {canWrite ? (
            <Button onClick={() => navigate("/heroes/new-hero")}>
              New Hero
            </Button>
          ) : (
            ""
          )}
        </Flex>
        <Table
          dataSource={mapDataSource(heroesFromApi?.data?.heroes as HeroModel[])}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Class" dataIndex="class" key="class" />
          {canWrite ? (
            <Column
              title="Action"
              key="action"
              render={(_, hero: DataSource) => (
                <a>
                  <EditOutlined
                    disabled={true}
                    onClick={() => navigate(`/heroes/hero/${hero?.key}`)}
                  />
                </a>
              )}
            />
          ) : (
            ""
          )}
        </Table>
      </>
    );
  } else {
    return (
      <>
        <Flex justify="center" wrap="wrap" gap="large">
          <h2>Sorry! You cannot read data.</h2>
        </Flex>
      </>
    );
  }
};

export default Heroes;
