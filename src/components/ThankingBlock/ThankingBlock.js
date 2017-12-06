import { h, Component } from 'preact';

const ThankingBlock = ({email, onClick, contactDesc}) => (
    <span>{contactDesc} <a href={`mailto:${email}`} onClick={onClick}>{email}</a></span>)


export default ThankingBlock;