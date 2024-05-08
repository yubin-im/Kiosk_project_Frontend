import clsx from 'clsx';

type Prop = {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
};
export const Pagination = ({ total, limit, page, setPage }: Prop) => {
  //   const numPages = Math.ceil(total / limit);
  const numPages = total;

  console.log('numpabes', numPages);
  return (
    <nav className='flex gap-1'>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        &lt;
      </button>
      {Array(numPages)
        .fill(0, 0, numPages)
        .map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPage(i);
            }}
            className={clsx({
              'bg-mcblack px-2 rounded-lg text-white': page != i,
              'bg-white text-black border border-mcblack px-2 rounded-lg':
                page === i,
            })}
            aria-current={page === i ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className='bg-mcblack px-2 rounded-lg text-white'
      >
        &gt;
      </button>
    </nav>
  );
};
