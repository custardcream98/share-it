import styled from "styled-components";
import CategoryBadge from "./CategoryBadge";

const CategoryBadgeWrapper = styled.ul`
  display: inline-flex;
  gap: 5px;

  flex-wrap: nowrap;
  overflow-y: auto;

  em {
    white-space: nowrap;
  }
`;

type Props = {
  categories: string[];
  postId: string;
};

const CategoryBadges = ({ categories, postId }: Props) => {
  return (
    <CategoryBadgeWrapper>
      {categories.map((cate) => (
        <CategoryBadge
          key={postId + cate}
          categoryKey={cate}
        />
      ))}
    </CategoryBadgeWrapper>
  );
};

export default CategoryBadges;
