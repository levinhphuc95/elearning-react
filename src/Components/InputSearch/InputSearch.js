import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { removeUnicode } from "./../../util/handleUnicode";

export function InputSearch(props) {
  const [display, setDisplay] = useState(false);
  const { danhSachKhoaHoc } = useSelector((state) => state.CourseReducer);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  const danhSachTenKhoaHoc = danhSachKhoaHoc.map((item) => {
    return item.tenKhoaHoc;
  });

  console.log(danhSachTenKhoaHoc);
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePokeDex = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <input
        id="auto"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {danhSachKhoaHoc
            .filter(
              ({ tenKhoaHoc }) =>
                removeUnicode(tenKhoaHoc).indexOf(search.toLowerCase()) > -1
            )
            .map((value, i) => {
              return (
                <div
                  onClick={() => updatePokeDex(value.tenKhoaHoc)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{value.tenKhoaHoc}</span>
                  <img src={value.hinhAnh} alt="pokemon" />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
