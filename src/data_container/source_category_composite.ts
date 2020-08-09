import { CategoryState, Category } from './category_data_container';
import { SourceState, Source } from './source_data_container';

interface SourceCategoryComposite {

    sourceState: SourceState;
    categoryState: CategoryState;
}

export { SourceCategoryComposite, Category, Source };