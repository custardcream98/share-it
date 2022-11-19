import styled from "styled-components";
import CategoryBadge from "./CategoryBadge";

const CategoryBadgeWrapper = styled.ul`
  display: inline-block;
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
