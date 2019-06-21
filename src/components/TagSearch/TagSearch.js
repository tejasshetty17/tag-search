import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Tag from '../Tag/Tag';

// Constants
import { SEARCH_ICON_SRC } from '../../constants';

import './TagSearch.css';

class TagSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tagged: new Set(),
          filtered: new Set(),
          isDropDownVisible: false,
          enteredValue: '',
        }
        this.toggleTags = this.toggleTags.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);

    }

    toggleTags(event) {
      const closeElementId = event.target.getAttribute("data-id");
      // console.log(elementId, 'gagaga');
      const tagged = [...this.state.tagged];
      const currentTagged = new Set(tagged);
      if(closeElementId){
        currentTagged.delete(event.target.getAttribute("data-id"));
        // const newTagged
        this.setState({ tagged: currentTagged});
        return;
      }
      currentTagged.add(event.target.getAttribute("id"));
      this.setState({tagged: currentTagged});
    }

    onChangeHandler(event) {
      const { availableTags } = this.props;
      const enteredValue = event.target.value;
      // console.log(event.keyCode);

      const filtered = availableTags.filter(
        tag =>
          tag.toLowerCase().indexOf(enteredValue.toLowerCase()) > -1
      );

      this.setState({
        filtered: new Set(filtered),
        isDropDownVisible: filtered.length ? true : false,
        enteredValue,
      });
    }

    onKeyUpHandler(event) {
      const key = event.keyCode;
      switch (key) {
        case 13:
          const fliteredValues = [...this.state.filtered.values()];
          const tagged = [...this.state.tagged.values(),fliteredValues.shift()];
          if(tagged.length) this.setState({ tagged: new Set(tagged), enteredValue: '', isDropDownVisible: false });
          break;

        default:
          break;
      }
      // console.log(key);
    }

    onFocusHandler(event){
      this.setState({isDropDownVisible: true});
    }

    render() {
        const { config: { placeHolder, spellCheck, autoFocus }, availableTags } = this.props;
        const { tagged, filtered, enteredValue, isDropDownVisible } = this.state;
        const tagInstances = availableTags.reduce((acc, tag) => {
          const tagInstance = <Tag key={tag} tagName={tag} toggleHandler={this.toggleTags} closeable={true} />;
          // console.log(tagInstance);
          tagged.has(tag) && (acc.tagged.set(tag, tagInstance));
          if(enteredValue) {
            filtered.has(tag) && (acc.dropDown.set(tag, tagInstance));
            return acc;
          }
          // console.log('hhhh');
          acc.dropDown.set(tag, tagInstance);
          return acc;
        },{tagged: new Map(), dropDown: new Map()});

        return (
          <div className="tag-search-wrapper">
            <div className="search-bar-input-wrapper">
              <img className="search-icon" src={SEARCH_ICON_SRC} />
              <div className="tag-container">
                {Array.from(tagInstances.tagged.values())}
                  <input
                    className="search-bar-input"
                    type="text"
                    onChange={this.onChangeHandler}
                    onKeyUp={this.onKeyUpHandler}
                    //   value={enteredValue}
                    placeholder={placeHolder}
                    spellCheck={spellCheck}
                    autoFocus={autoFocus}
                    value={enteredValue}
                    onFocus={this.onFocusHandler}
                  />
              </div>
            </div>
            {isDropDownVisible && (
              <div className="tag-dropdown">
                {[...tagInstances.dropDown.values()]}
              </div>
            )}
          </div>
        );
    }
}

 TagSearch.propTypes = {
   config: PropTypes.shape({
     placeHolder: PropTypes.string,
     spellCheck: PropTypes.string,
     autoFocus: PropTypes.bool
   }),
   availableTags: PropTypes.arrayOf(PropTypes.string)
 };

 export default TagSearch;