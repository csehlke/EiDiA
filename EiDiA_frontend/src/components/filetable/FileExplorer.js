import React from 'react';
import Element from './Element'
import styled from "styled-components";
import ElementTable from "./ElementTable";
import {databaseEntriesPlaceholder, fileTypes} from "../../assets/Constants";

const ElementBoundary = styled.div`
    height: auto;
`;

/**
 * TODO:
 * - Cant drag files to toplevel at the moment
 * - Design DnD operations
 */
export default class FileExplorer extends React.Component {

    constructor(props) {
        super(props);
        //TODO is this wanted? This unfolds all folder at the beginning
        databaseEntriesPlaceholder.forEach(element => element.active = false);

        this.state = {
            elements: databaseEntriesPlaceholder,
        }
    }

    /*
     * The following four functions are only helper functions, as long as there is no backend
     * */
    find(id) {
        for (let i = 0; i < this.state.elements.length; i++) {
            let tmp = this.findElement(this.state.elements[i], id);
            if (tmp != null) {
                return tmp;
            }
        }
        return null;
    }

    findElement(element, id) {
        if (element.id === id) {
            return element;
        }
        for (let i = 0; i < element.children.length; i++) {
            let tmp = this.findElement(element.children[i], id);
            if (tmp != null) {
                return tmp;
            }
        }
        return null;
    }

    removeFromParent(child) {
        if (child.parentId === 0) {
            this.removeFromArray(this.state.elements, child);
        } else {
            let oldParent = this.find(child.parentId);
            this.removeFromArray(oldParent.children, child);
        }
    }

    removeFromArray(array, objectToRemove) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === objectToRemove) {
                array.splice(i, 1);
            }
        }
    }

    setNewParent(child, newParentId) {
        //TODO: this should actually be handled by the backend?
        this.find(newParentId).children.push(child);
        this.removeFromParent(child);
        child.parentId = newParentId;

        this.setState(this.state);
    }

    activeToggle(element) {
        element.active === true ?
            element.active = false :
            element.active = true;
        this.setState(this.state);
    }

    renderElement(element, index, level) {
        return (
            <ElementTable key={"ELTable" + element.id}
                          type={element.type}
                          id={element.id}>
                <Element key={"EL" + element.id}
                         active={element.active} index={index}
                         parentId={element.parentId}
                         id={element.id}
                         level={level}
                         type={element.type}
                         name={element.name}
                         dateCreation={element.dateCreation}
                         dateModification={element.dateModification}
                         comment={element.comment}
                         actions={element.actions}
                         handleDrop={(newParentId) =>
                             this.setNewParent(element, newParentId) /*(oldIndex, newIndex) => this.changeElements(oldIndex, newIndex)*/}
                         activeToggle={this.activeToggle.bind(this, element)}>

                    {element.active === true ?
                        element.children.map((child, indexChild) =>
                            this.renderElement(child, "" + index + indexChild, level + 1)) :
                        null}

                </Element>
            </ElementTable>
        );
    }

    render() {
        return (
            <ElementBoundary>
                <Element level={0}
                         type={fileTypes.NONE}
                         name={'Name'}
                         dateCreation={'Date'}
                         dateModification={'Last Modified'}
                         comment={'Comment'}
                         actions={['HEADING']}/>
                <hr/>
                {this.state.elements.map((element, index) =>
                    this.renderElement(element, index, 0)
                )}
            </ElementBoundary>
        );
    }
}
