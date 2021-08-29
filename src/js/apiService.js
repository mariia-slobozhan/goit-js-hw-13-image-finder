export { apiService as default };
const apiService = {
  searchQuery: '',
  page: 1,
  key: '23126323-c48f66a824a8fc9c468cd2358',

  fetchPictures() {
    return fetch(
      `https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal`,
    )
      .then(response => response.json())
      .then(result => {
        this.page += 1;
        return result;
      });
  },
  resetPage(){
      this.page =1 ;
  }
};
