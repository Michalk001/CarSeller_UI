import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';



const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

class Pagination extends Component {

    constructor(props) {
        super(props);
        const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

        // pageNeighbours can be: 0, 1 or 2
        this.pageNeighbours = typeof pageNeighbours === 'number'
            ? Math.max(0, Math.min(pageNeighbours, 2))
            : 0;

        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
        
        this.state = { currentPage: this.props.currentPage };
    }

    componentDidMount() {
        this.gotoPage(this.state.currentPage);
    }

    gotoPage = page => {
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));

        const paginationData = {
            currentPage: this.state.currentPage,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit,
            totalRecords: this.totalRecords
        };

        this.setState({ currentPage }, () => onPageChanged(paginationData));
    }

    handleClick = page => evt => {
        evt.preventDefault();
        this.gotoPage(page);
        this.props.changePageCallback(page)
    }

 

    fetchPageNumbers = () => {

        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;


        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        

        

        return range(1, totalPages);

    }

    render() {
      
        if (!this.totalRecords || this.totalPages === 1) return null;

        const { currentPage } = this.state;
      
        const pages = this.fetchPageNumbers();
       
        return (
            <Fragment>
                <div className="pagination" aria-label="Pagination">
                    <ul className="pagination-row">
                        {

                        
                            <li key="1" className={`pagination-cell${currentPage <= 1 ? ' pagination-cell-hidden' : ''}`}  >
                                <a  onClick={this.handleClick(currentPage <= 1 ? 1 : currentPage-1)}   className="pagination-link pagination-link-first" href="#" aria-label="Previous" onClick={this.handleClick(currentPage-1)}/>
                            </li>

                        }
                        {pages.map((page, index) => {

                            return (
                                <li key={index} className={`pagination-cell${currentPage === page ? ' active' : ''}`}>
                                    <a className="pagination-link" href="#" onClick={this.handleClick(page)}><span>{page}</span></a>
                                </li>
                            );

                        })}
                        {

                            <li key={this.state.totalPages} className={`pagination-cell${currentPage >= (this.totalPages) ? ' pagination-cell-hidden' : ''}`} >
                                <a onClick={this.handleClick(currentPage >= (this.totalPages) ? 1 : currentPage+1)} className="pagination-link pagination-link-last" href="#" aria-label="Next"/>
                            </li>
                        }

                    </ul>
                </div>
            </Fragment>
        );

    }
}

Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    onPageChanged: PropTypes.func
};

export default Pagination;