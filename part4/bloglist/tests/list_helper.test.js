const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    const listOfBlogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        {
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }
    ]

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listOfBlogs)
        expect(result).toBe(34)
    })

})

describe('favorite blog', () => {

    test('of empty list is {}', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, he is the favorite', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    const listOfBlogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        {
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }
    ]

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            likes: 12
        })
    })

    const listOfBlogsWithEqualLikes = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 12, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        {
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }
    ]

    test('of a list with two favorite blogs', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        expect(result).toEqual({
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            likes: 12
        })
    })

})

describe('most blogs', () => {

    test('of empty list is empty', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog his author is the most publisher', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    const listOfBlogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        {
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }
    ]

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(listOfBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 2
        })
    })

})

describe('most likes', () => {

    test('of empty list is empty', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog his author is the most liked', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    const listOfBlogs = [ 
        { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }, 
        { 
            _id: "5a422aa71b54a676234d17f8", 
            title: "Go To Statement Considered Harmful", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
            likes: 5, 
            __v: 0 
        }, 
        { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12,
            __v: 0 
        }, 
        {
            _id: "5a422b891b54a676234d17fa", 
            title: "First class tests", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
            likes: 10, 
            __v: 0 
        }
    ]

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(listOfBlogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })

})