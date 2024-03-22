import React from 'react'

type OptionType = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  job: string,
}

const useOptions = () => {
  const [options, setOptions] = React.useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [noMore, setNoMore] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  const formattedOptions = options.map(({ id, last_name, first_name, job }) => ({ label: `${first_name} ${last_name}, ${job}`, value: id }));

  const observer = React.useRef<IntersectionObserver | null>(null);

  const lastEntryRef = React.useCallback(
    (node: Element | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !noMore) {
          setPage(page + 1);
        }
      })

      if (node) observer.current.observe(node);
    }, [isLoading]);

  const getOptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://alanbase.vercel.app/api/users?page=${page}&limit=50`);
      const data = await response.json();
      if (page === 1) setOptions([]);
      if (data.data.length === 0) setNoMore(true);
      const allItems = [...options, ...data.data];
      setOptions(allItems);
    } catch (e) {
      console.log('get options error >>>', e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!noMore) getOptions();
  }, [page]);

  return { options, isLoading, lastEntryRef, formattedOptions };
}

export default useOptions;