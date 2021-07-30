import { BASE_URL } from "../main";

const Header = () => {
	const template = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="">
      <a class="navbar-brand" href="${BASE_URL}">Random Q and A</a>
    </div>
  </nav>
  `;

	return template;
};

export default Header;
