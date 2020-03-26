const lodash = require('lodash')

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

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return {}
    }

    // count occurence of each author
    countAuthors = lodash.countBy(blogs, 'author')
    // transform the dictionary into list of lists
    entries = lodash.entries(countAuthors)
    // take the max by the count
    mostBlogsAuthor = lodash.maxBy(entries, (item) => item[1])
    
    return {
        'author': mostBlogsAuthor[0],
        'blogs': mostBlogsAuthor[1]
    }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return {}
    }

    // group the blog of each author
    groupAuthors = lodash.groupBy(blogs, 'author')

    // map the dict realizing the sum of likes of each author
    authorTotalLikes = lodash.map(groupAuthors, (blogs, author) => ({
        'author': author,
        'likes': lodash.sumBy(blogs, 'likes')
    }))
    
    // find the most liked by the likes number
    mostLiked = lodash.maxBy(authorTotalLikes, (author) => author.likes)

    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}