<?php 
class controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['search', 'read']);
    }

    public function search()
    {
        $result = Annotation::wherePageId(request('uri'))->get()->filter(function ($annotation) {
            return $annotation->isPublic() || $annotation->isOfUser(auth()->user());
        })->values();

        return response()->json([
            'total' => $result->count(),
            'rows'  => $result
        ]);
    }

    public function store()
    {
        if ($user = request('user')) {
            if ($user['id'] !== auth()->id()) {
                throw new AuthorizationException();
            }
        }

        return Annotation::create([
            'ranges'      => request('ranges'),
            'quote'       => request('quote'),
            'text'        => request('text'),
            'permissions' => $this->setPermissions(request('permissions')),
            'page_id'     => request('uri'),
            'user_id'     => auth()->id()
        ])->load('user');
    }
}
?> 
