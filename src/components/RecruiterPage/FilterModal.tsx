import { css, Box, Button, Typography, useTheme } from '@mui/material';
import AnimatedModal from '@components/AnimatedModal';
import { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface FilterModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    items: string[];
    selectedItems: string[];
    onChange: (selected: string[]) => void;
    multiSelect?: boolean;
    hasSelectAll?: boolean;
}

const FilterModal = ({
    open,
    onClose,
    title,
    items,
    selectedItems,
    onChange,
    multiSelect = false,
    hasSelectAll = false,
}: FilterModalProps) => {
    const { palette, radius, typo } = useTheme();
    const [tempSelected, setTempSelected] = useState<string[]>([]);

    useEffect(() => {
        if (open) {
        setTempSelected(selectedItems);
        }
    }, [open, selectedItems]);

    const isAllSelected = tempSelected.length === items.length;
    
    const handleItemClick = (item: string) => {
        if (hasSelectAll && item === '모두 보기') {
            if (isAllSelected) {
                setTempSelected([]);
            } else {
                setTempSelected([...items]);
            }
        return;
        }
        if (multiSelect) {
            setTempSelected((prev) =>
                prev.includes(item)
            ? prev.filter((i) => i !== item)
            : [...prev, item]
        );
        } else {
            setTempSelected([item]);
        }
    };

    const handleConfirm = () => {
        onChange(tempSelected);
        onClose();
    };
    
    const displayItems = hasSelectAll ? ['모두 보기', ...items] : items;
    
    return (
        <AnimatedModal open={open} onClose={onClose}>
        <Typography
            css={css`
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 16px;
                font-family: ${typo.fontFamily.Pretendard};
                color: ${palette.text.primary};
            `}
        >
            {title}
        </Typography>

        <Box
            css={css`
                display: flex;
                flex-direction: column;
                gap: 12px;
            `}
        >
            {displayItems.map((item) => {
            const isSelected =
                item === '모두 보기' ? isAllSelected : tempSelected.includes(item);

            return (
                <Box
                key={item}
                onClick={() => handleItemClick(item)}
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: ${palette.background.tertiary};
                    border-radius: ${radius.md};
                    padding: 10px 16px;
                    cursor: pointer;
                `}
                >
                <Typography
                    css={css`
                        font-family: ${typo.fontFamily.Pretendard};
                        color: ${palette.text.primary};
                        font-size: 14px;
                    `}
                >
                    {item}
                </Typography>
                {isSelected ? (
                    <CheckCircleIcon
                    css={css`
                        color: ${palette.icon.primary};
                    `}
                    />
                ) : (
                    <CheckCircleOutlineIcon
                    css={css`
                        color: ${palette.icon.primary};
                    `}
                    />
                )}
                </Box>
            );
            })}
        </Box>

        <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            css={css`
                background-color: ${palette.background.quinary};
                margin-top: 24px;
                border-radius: 12px;
                border: none;
                padding: 10px 0;
            `}
        >
            완료
        </Button>
        </AnimatedModal>
    );
};

export default FilterModal;
