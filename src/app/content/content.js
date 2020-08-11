import React, {useState} from 'react';
import './content.scss';
import FilmItem from './film-item/film-item';
import Tabs from '../../general/components/tabs/tabs';
import Dropdown from '../../general/components/dropdown/dropdown';
import image from '../../img/film-image.png';

const tabs = [
    {id: 0, title: 'All', active: true},
    {id: 1, title: 'Documentary'},
    {id: 2, title: 'Comedy'},
    {id: 3, title: 'Horror'},
    {id: 4, title: 'Crime'},
];

const filterItems = [
    {id: 0, title: 'Release Date'},
    {id: 1, title: 'Title'},
    {id: 2, title: 'Genre'},
    {id: 3, title: 'Runtime'},
];

const loadedFilms = Array.from(Array(20).keys()).map(el => (
    {
        id: el,
        title: `Title of Film ${el}`,
        releaseDate: '2000',
        movieUrl: 'http://fdfdfdfddf.com',
        image: el % 3 === 0 ? image : undefined,
        genres: [tabs[Math.floor((Math.random() * 3 + 1))].title],
        overview: 'Loooooooooooooooooong teeeeeeeeeeeeeeeeextttttttttt',
        runtime: '1:35'
    }));

export default function Content() {
    const [films, setFilms] = useState(loadedFilms);
    const [filter, setFilter] = useState(filterItems[0]);

    const onTabClicked = (el) => {
        if (el.id === 0) {
            setFilms(loadedFilms);
        } else {
            setFilms(loadedFilms.filter(e => e.genres.includes(el.title)));
        }
    }

    const onFilterSelected = (el) => {
        setFilter(el);
        console.log('Filter by ', el.title);
    }

    const perform = (action, film) => {
        console.log(action.title, film.title);
    }

    return (
        <div className='Content'>
            <Tabs
                tabs={tabs}
                right={
                    <>
                        <div className='SortLabel'>Sort by</div>
                        <Dropdown
                            selected={filter}
                            items={filterItems}
                            onItemSelected={onFilterSelected}
                        />
                    </>
                }
                onTabClicked={(el) => onTabClicked(el)}>
                {
                    <div className='ContentContainer'>
                        <div className='FilmsCountContainer'>
                            <span className='FilmsCount'>{films.length}</span> movies found
                        </div>
                        {
                            films.length ?
                                <div className='FilmContainer'>{
                                    films.map(el =>
                                    <FilmItem
                                        key={el.id}
                                        film={el}
                                        onMenuItemSelected={(a) => perform(a, el)}/>)
                                }
                                </div>

                                :
                                <div className="NoData">No films found</div>
                        }

                    </div>
                }
            </Tabs>
        </div>
    );
}
