import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { CircleIconButton } from 'components/base';
import { PortfolioTable, TradePortfolioTable } from 'components/user';
import { PortfolioInfo, TradeInfo } from 'types';


type TradePortfolioEditProps = {
  trade: TradeInfo;
  allPortfolios: PortfolioInfo[];
  activePortfolios: number[];
  onUpdatePortfolio: (values: { portfolios: number[] }) => void;
  onToggleStatus: (values: { portfolioId: number, status: boolean }) => void;
}
export const TradePortfolioEdit = (
  {
    trade, allPortfolios, activePortfolios,
    onUpdatePortfolio, onToggleStatus
  }: TradePortfolioEditProps
) => {
  const navigate = useNavigate();
  const [editPortfolio, setEditPortfolio] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (editPortfolio) {
      const current = trade?.portfolios ?? [];
      setSelected(current.map(item => item.portfolio.id));
    }
  }, [editPortfolio, trade])

  const toggleEditPortfolio = () => {
    setEditPortfolio(edit => !edit);
    setSelected((trade?.portfolios ?? []).map(item => (item.portfolio.id)));
  }

  const onSelectAllPortfolios = (checked: boolean) => {
    if (checked) {
      setSelected((allPortfolios ?? []).map(item => item.id));
    } else {
      setSelected([]);
    }
  }

  const onSelectPortfolio = (id: number) => {
    const pos = selected.indexOf(id);
    if (pos >= 0) {
      selected.splice(pos, 1);
      setSelected([...selected]);
    } else {
      setSelected([...selected, id]);
    }
  }

  const onSelect = (id: number) => {
    navigate(`/user/business/portfolios/${id}`);
  }

  const portfoliosToAdd = allPortfolios?.filter(
    item => !activePortfolios.includes(item.id)
  ) ?? [];

  return (
    <>
      <section className='input-group hover-show-wrapper'>
        <div className='d-flex align-items-end'>
          <Typography component='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
            Portfolios
          </Typography>
          {trade?.status && (
            <div className='align-items-center hover-show'>
              <CircleIconButton onClick={toggleEditPortfolio}>
                {editPortfolio ? <CloseIcon /> : <EditIcon />}
              </CircleIconButton>
              {editPortfolio && (
                <CircleIconButton onClick={() => onUpdatePortfolio({ portfolios: selected })}>
                  <CheckIcon />
                </CircleIconButton>
              )}
            </div>
          )}
        </div>
        {editPortfolio ? (
          <PortfolioTable
            portfolios={portfoliosToAdd}
            onSelectAll={onSelectAllPortfolios}
            onSelect={onSelectPortfolio}
            selected={selected}
          />
        ) : (
          <TradePortfolioTable
            portfolios={trade?.portfolios ?? []}
            onSelect={onSelect}
            onToggleStatus={onToggleStatus}
          />
        )}
      </section >
    </>
  )
}