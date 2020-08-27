import image0 from "../../img/film-image-0.png";
import image1 from "../../img/film-image-1.png";
import image2 from "../../img/film-image-2.png";
import image3 from "../../img/film-image-3.png";
import image4 from "../../img/film-image-4.png";
import image5 from "../../img/film-image-5.png";

const imgs = [image0, image1, image2, image3, image4, image5];

export const genres = ['Documentary', 'Comedy', 'Horror', 'Crime'];

export const allFilms = Array.from(Array(20).keys()).map(el => (
    {
        id: el,
        title: `Title of Film ${el}`,
        releaseDate: '2000-10-12',
        url: 'http://test.com',
        image: imgs[el%7],
        genres: [genres[Math.floor((Math.random() * genres.length))]],
        overview: 'Loooooooooooooooooong teeeeeeeeeeeeeeeeextttttttttt',
        runtime: '1:35'
    }));


