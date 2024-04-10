import { useState, useRef, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getHeroes } from "../../services/heroesService";
import { HeroModel } from "../../interfaces/IHero";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Flex, Table, Skeleton, Input, Space } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType, GetProp, TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableDataType {
  key: number;
  name: string;
  class: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
}

type DataIndex = keyof TableDataType;

const Heroes = () => {

  const [canRead] = useState(parseInt(window.yayHeroes.canRead));
  const [canWrite] = useState(parseInt(window.yayHeroes.canWrite));
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5
    }
  });

  const searchInput = useRef<InputRef>(null);

  const navigate = useNavigate();

  const heroes = useQuery({
    queryKey: ["getHeroes"],
    queryFn: async () => await getHeroes(getHeroesParams(tableParams)),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData
  });

  const handleSearch = (confirm: FilterDropdownProps['confirm']) => { confirm() };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TableDataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  });

  const columns: TableColumnsType<TableDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      ...getColumnSearchProps('class'),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_, hero: TableDataType) => (
        <a>
          <EditOutlined
            onClick={() => navigate(`/heroes/hero/${hero?.key}`)}
          />
        </a>
      )
    }
  ];

  function mapDataSource(dataArr: HeroModel[]): TableDataType[] {
    const dataSource = dataArr.map((item) => ({
      key: item?.id,
      name: item?.name,
      class: item?.class,
    }));
    return dataSource;
  }

  const handleTableChange: TableProps['onChange'] = (pagination) => {
    setTableParams({ pagination });
  }



  useEffect(() => {
    heroes.refetch();
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: heroes.data?.total
      }
    });
  }, [heroes, tableParams]);

  const getHeroesParams = (params: TableParams) => ({
    postsPerPage: params.pagination?.pageSize,
    paged: params.pagination?.current,
    ...params,
  });

  if (canRead) {
    if (heroes?.isLoading) {
      return (
        <Skeleton active />
      );
    }
    if (heroes?.isError) {
      return (
        <Flex align="center">
          <h2>An error has occurred: + {heroes?.error?.message}</h2>
        </Flex>
      );
    }
    return (
      <>
        <Flex align="center" justify="between" wrap="wrap" gap="large">
          <h1>Heroes</h1>
          <Button
            loading={heroes?.isFetching}
            type="primary"
            onClick={() => heroes?.refetch()}
          >{`${heroes?.isFetching ? "Fetching" : "Refetch"}`}</Button>
          <Button disabled={!canWrite ? true : false} onClick={() => navigate("/heroes/new-hero")}>
            New Hero
          </Button>
        </Flex>
        {
          <Table
            loading={heroes?.isFetching}
            columns={columns}
            pagination={tableParams.pagination}
            rowKey={(record) => record?.key}
            dataSource={mapDataSource(heroes?.data?.heroes as HeroModel[])}
            onChange={handleTableChange}
          />
        }
        <Outlet />
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
