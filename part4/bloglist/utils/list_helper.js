const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const findGreatest = (acc, item) => {
        return acc.likes > item.likes ? acc : item
    }

    favorite = blogs.reduce(findGreatest,1)

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}