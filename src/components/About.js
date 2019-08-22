import React from "react";

export default function About() {
  return (
    <div className="text-container">
      <h1>About</h1>
      <blockquote className="blockquote">
        <p className="mb-0">
          “In conceptual art the idea or concept is the most important aspect of
          the work.”
        </p>
        <footer className="blockquote-footer">
          <cite>Sol LeWitt</cite>
        </footer>
      </blockquote>

      <div className="About content">
        <p>
          This project was inspired by Conceptual Artist{" "}
          <a href="https://www.nytimes.com/2007/04/09/arts/design/09lewitt.html">
            Solomon "Sol" LeWitt
          </a>
          . Sol worked with various media, but this project explores his{" "}
          <a href="https://massmoca.org/sol-lewitt/">wall drawings</a>, where
          each piece is defined by a set of instructions that are left open to
          interpretation by other artists that execute the works.
        </p>
        <p>
          Because of the collaborative nature of these wall drawings, Sol
          LeWitt's works may appear very different from each other, even for the
          same set of instructions. This project randomizes the ambiguous
          properties of each drawing to explore the constraints of each work.
        </p>
        <h2>Other Resources</h2>
        <ul>
          <li>
            <a href="https://solvingsol.com">Solving Sol</a>: An open project to
            implement Sol LeWitt's instructions in JavaScript
          </li>
          <li>
            <a href="https://massmoca.org/sol-lewitt/">
              Sol LeWitt: A Wall Drawing Retrospective
            </a>{" "}
            at the Massachusetts Museum of Contemporary Art
          </li>
        </ul>
      </div>
    </div>
  );
}
