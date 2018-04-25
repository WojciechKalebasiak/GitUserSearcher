class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users: []
        };
    }
    onChangeHandle(e) {
        this.setState({ searchText: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const { searchText } = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ users: data.items }))
            .catch(err => { console.log(`${err} appeared`) });
    }
    render() {
        return (
            <div>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <label htmlFor="searchtext">Search user name</label>
                    <input type="text"
                        id="searchText"
                        onChange={(event) => this.onChangeHandle(event)}
                        value={this.state.searchText}
                        placeholder="type user name..."
                    />
                </form>
                <UserList userList={this.state.users} />
            </div>
        );
    }
}
class UserList extends React.Component {
    get users() {
        return this.props.userList.map(user => <User key={user.id} user={user} />);
    }
    render() {
        return (
            <div>
                {this.users}
            </div>
        );
    }
}
class User extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.user.avatar_url} alt="user avatar" />
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
